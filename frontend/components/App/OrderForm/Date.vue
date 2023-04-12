<template>
  <div class="date__container mt-10">
    <div class="calendar flex items-center mb-12">
      <p class="calendar__title text">Дата: </p>
      <Calendar :min-date="minDate" :max-date="maxDate" class="w-full" showIcon v-model="date" dateFormat="dd/mm/yy"
        :touch-u-i="isMobile" />
    </div>
    <div class="time">
      <p class="time__title text">Время: <span class="pl-6 font-normal text-md text-gray-400" v-if="!date">Выберите
          дату</span></p>
      <div class="btn-group" v-if="date">
        <template v-for="el in 10">
          <button class="btn-time">10:00</button>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup lang='ts'>
const date = ref('')
const isMobile = ref(false)
const selectedTime = useSelectTime()

const today = new Date()
const month = today.getMonth()
const nextMonth = (month === 11) ? 0 : month + 1

const minDate = ref(new Date())
const maxDate = ref(new Date())

maxDate.value.setMonth(nextMonth)

onMounted(() => {
  isMobile.value = screen.width <= 760
})


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