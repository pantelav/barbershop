<template>
  <div class="date__container mt-10">
    <div class="calendar flex items-center mb-12">
      <p class="calendar__title text">Дата: </p>
      <Calendar :min-date="minDate" :max-date="maxDate" class="w-full pr-2" showIcon v-model="date" dateFormat="dd.mm.yy"
        :touch-u-i="isMobile" :disabled-days="getWeekdays" @date-select="getTimes" />
    </div>
    <div class="time">
      <p class="time__title text">Время: <span class="pl-6 font-normal text-md text-gray-400" v-if="!date">Выберите
          дату</span></p>
      <div class="btn-group pr-2 pb-2" v-if="date">
        <AppSpinner v-if="loadingTimes" />
        <template v-for="time in times" :key="time" v-else>
          <button class="btn-time" :class="{'btn-active': order.time === time}" @click="selectTime(time)">{{ time }}</button>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { endpoints } from '~/constants/endpoints'


const order = useOrder()
const date = ref<Date | null>(null)
const times = ref<string[]>()
const loadingTimes = ref(false)
const isMobile = ref(false)

const today = new Date()
const month = today.getMonth()
const nextMonth = (month === 11) ? 0 : month + 1

const minDate = ref(new Date())
const maxDate = ref(new Date())

maxDate.value.setMonth(nextMonth)

const getWeekdays = computed(() => {
  const days = [0, 1, 2, 3, 4, 5, 6]
  if (!order.value.barber) return []
  const weekdays = days.filter((day) => !order.value.barber?.workdays.includes(day))
  return weekdays
})

onMounted(async () => {
  isMobile.value = screen.width <= 760
  if (order.value.date) {
    date.value = order.value.date as Date
    await getTimes()
  }
})

async function getTimes () {
  try {
    if (!date.value) return
    order.value.time = null
    order.value.date = date.value
    loadingTimes.value = true
    const { data, error } = await useApiFetch<string[] | null>(endpoints.client.times, {
      params: {
        barberId: order.value.barber?.id,
        date: date.value.toString()
      }
    })
    if (error.value) return useNotify('error', 'Ошибка загрузки данных')
    if (data.value) times.value = data.value
  } catch (error) {
    useNotify('error', 'Ошибка загрузки данных')
  } finally {
    loadingTimes.value = false
  }
}

function selectTime(time: string) {
  order.value.time = time
}
</script>

<style scoped lang="scss">
.text {
  margin-right: 20px;
  font-weight: 600;
  font-size: 20px;
}

.btn-group {
  margin-top: 20px;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 10px;

  @media screen and (max-width: 550px) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media screen and (max-width: 450px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media screen and (max-width: 350px) {
    grid-template-columns: repeat(2, 1fr);
  }
}

.btn-time {
  padding: 5px 10px;
  border: 1px solid $orange;
}

.btn-active {
  background-color: $orange;
}
</style>