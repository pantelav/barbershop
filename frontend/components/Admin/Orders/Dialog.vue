<template>
  <div class="dialog__container flex flex-col gap-4 w-[300px]">
    <p>Имя</p>
    <InputText :disabled="editMode" v-model="orderData.name" />
    <p>Телефон</p>
    <InputText :disabled="editMode" v-model="orderData.phone" />
    <p>Барбер</p>
    <Dropdown :options="barbers" option-label="name" option-value="_id" placeholder="Выбрать мастера"
      v-model="orderData.barber" @change="resetDate" />
    <p>Статус</p>
    <Dropdown :options="statuses" option-label="name" optionValue="code" placeholder="Изменить статус"
      v-model="orderData.status" />
    <p>Услуги</p>
    <MultiSelect :options="services" optionLabel="title" optionGroupLabel="title" optionGroupChildren="services"
      display="chip" placeholder="Выбрать услуги" v-model="orderData.services" />

    <p>Дата</p>
    <Calendar v-model="orderData.date" showIcon :min-date="new Date()" date-format="dd.mm.yy" :disabled-days="getWeekdays"
      :disabled="!orderData.barber" @date-select="getTimes" />
    <p>Время</p>
    <Dropdown v-model="orderData.time" :options="times" :disabled="!orderData.date" />
    <p class="text-lg">Цена: {{ getPrice }}</p>
    <AppSpinner v-if="isLoading" />
    <div class="dialog__actions flex w-full" :class="{ 'justify-end': !editMode, 'justify-between': editMode }" v-else>
      <Button label="Удалить" severity="danger" text v-if="editMode" @click="deleteOrder" />
      <Button label="Сохранить" @click="editMode ? editOrder() : createOrder()"
        :disabled="!orderData.name || !orderData.phone || !orderData.date || !orderData.time" />
    </div>
  </div>
</template>

<script setup lang='ts'>
import { endpoints } from '~/constants/endpoints';
import { IOrder } from '~/types/order';
import { ICategoryWithServices, IService } from '~/types/service'
import { IStaff } from '~/types/staff';

const emit = defineEmits(['close'])
const props = defineProps(['order'])
const isLoading = ref(false)
const editMode = ref(false)
const barbers = ref<IStaff[]>([])
const services = ref<ICategoryWithServices[]>()
const enum Actions {
  Mount,
  Create,
  Edit
}
const statuses = ref([
  { name: 'Активен', code: 'active' },
  { name: 'Завершен', code: 'resolved' },
  { name: 'Отменен', code: 'rejected' },
])
const times = ref<string[]>([])
const orderData = reactive<IOrder>({
  name: '',
  phone: '',
  barber: null,
  services: [],
  status: 'active',
  date: null,
  time: '',
  price: 0,
  comment: '',
})

const getPrice = computed(() => {
  let price = 0
  if (orderData.services.length == 0) return 0
  orderData.services.forEach(service => {
    price += service.price
  })
  return price
})

const getWeekdays = computed(() => {
  const days = [0, 1, 2, 3, 4, 5, 6]
  if (!orderData.barber) return []
  if (barbers.value) {
    const barber = barbers.value.find(el => el._id === orderData.barber)
    const weekdays = days.filter((day) => !barber?.workdays.includes(day))
    return weekdays
  }
})

onMounted(async () => {
  try {
    isLoading.value = true
    const { data: barbersData } = await useApiFetch(endpoints.admin.barbers)
    const { data: servicesData } = await useApiFetch(endpoints.admin.all)
    barbers.value = toRaw(barbersData.value) as IStaff[]
    services.value = toRaw(servicesData.value) as ICategoryWithServices[]
    if (props.order) {
      Object.assign(orderData, props.order)
      editMode.value = true
      orderData.services = matchServices(services.value)
      formatDate(Actions.Mount)
      if (orderData.date) {
        await getTimes()
        if (orderData.time) times.value.unshift(orderData.time)
      }
    }
  } catch (error) {
    useNotify('error', 'Ошибка загрузки данных')
  } finally {
    isLoading.value = false
  }

})

async function createOrder () {
  try {
    isLoading.value = true
    if (orderData.date && orderData.time) {
      formatDate(Actions.Create)
      await useApiFetch(endpoints.admin.orders, {
        method: 'post',
        body: unref(orderData)
      })
      emit('close')
      useNotify('success', 'Запись добавленна')
    }
  } catch (error) {
    useNotify('error', 'Ошибка загрузки данных')
  } finally {
    isLoading.value = false
  }
}

async function editOrder () {
  try {
    isLoading.value = true
    const id = props.order._id
    formatDate(Actions.Edit)
    await useApiFetch(endpoints.admin.orders, {
      method: 'put',
      body: unref(orderData),
      params: { id }
    })
    emit('close')
    useNotify('success', 'Изменения сохранены')
  } catch (error) {
    useNotify('error', 'Ошибка загрузки данных')
  } finally {
    isLoading.value = false
  }
}

async function deleteOrder () {
  try {
    isLoading.value = true
    const id = props.order._id
    await useApiFetch(endpoints.admin.orders, {
      method: 'delete',
      params: { id }
    })
    emit('close')
    useNotify('success', 'Запись удалена')
  } catch (error) {
    useNotify('error', 'Ошибка загрузки данных')
  } finally {
    isLoading.value = false
  }
}

function matchServices (fetchedServices: ICategoryWithServices[]) {
  const temp: IService[] = []
  const matchedServices: IService[] = []
  fetchedServices.forEach(category => {
    category.services.forEach(service => {
      temp.push(service)
    })
  })
  temp.forEach(item => {
    orderData.services.forEach(service => {
      if (item.title === service.title) {
        matchedServices.push(item)
      }
    })
  })
  return matchedServices
}

function formatDate (action: Actions) {
  function dateObjectToString () {
    if (orderData.date instanceof Date && orderData.time) {
      const [hours, minutes] = orderData.time.split(':')
      orderData.date.setHours(+hours, +minutes)
      orderData.date = orderData.date.toString()
    }
  }
  if (action == Actions.Mount && props.order?.date) {
    const date = new Date(props.order.date)
    const day = date.toLocaleDateString()
    const time = [date.getHours(), (date.getMinutes() < 10 ? '0' : '') + date.getMinutes()].join(':')
    orderData.date = day
    orderData.time = time
  }
  if (action == Actions.Create && orderData.date instanceof Date && orderData.time) {
    dateObjectToString()
  }

  if (action == Actions.Edit) {
    if (typeof orderData.date === 'string') {
      let dateArr = orderData.date.split('.')
      let timeArr
      const date = new Date(+dateArr[2], +dateArr[1] - 1, +dateArr[0])
      if (orderData?.time) {
        timeArr = orderData.time.split(':')
        date.setHours(+timeArr[0])
        date.setMinutes(+timeArr[1])
      }
      orderData.date = date.toString()
    }
    if (orderData.date instanceof Date) {
      dateObjectToString()
    }
  }
}

function resetDate () {
  orderData.date = null,
    orderData.time = ''
}

async function getTimes () {
  if (!orderData.date || !orderData.barber) return
  try {
    const date = orderData.date.toString()
    const { data } = await useApiFetch(endpoints.admin.times, {
      params: {
        barberId: orderData.barber,
        date
      }
    })
    if (Array.isArray(data.value) && data.value.length > 0) {
      // @ts-ignore
      times.value = data.value
    }
  } catch (error) {
    useNotify('error', 'Ошибка загрузки данных')
  }
}
</script>

<style scoped lang='scss'></style>