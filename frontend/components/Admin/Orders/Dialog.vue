<template>
  <div class="dialog__container flex flex-col gap-4 w-[300px]">
    <p>Имя</p>
    <InputText :disabled="editMode" v-model="orderData.name" />
    <p>Телефон</p>
    <InputText :disabled="editMode" v-model="orderData.phone" />
    <p>Барбер</p>
    <Dropdown :options="barbers" placeholder="Выбрать мастера" v-model="orderData.barber" />
    <p>Статус</p>
    <Dropdown :options="statuses" option-label="name" optionValue="code" placeholder="Изменить статус"
      v-model="orderData.status" />
    <p>Услуги</p>
    <MultiSelect :options="groupedServices" optionLabel="label" optionGroupLabel="label" optionGroupChildren="items"
      display="chip" placeholder="Выбрать услуги" v-model="orderData.services" />

    <p>Дата</p>
    <Calendar v-model="orderData.date" showIcon date-format="dd/mm/yy" @date-select="orderData.time = ''"/>
    <p>Время</p>
    <Dropdown v-model="orderData.time" :options="times" :disabled="!orderData.date" />

    <div class="dialog__actions flex pt-3 w-full" :class="{ 'justify-end': !editMode, 'justify-between': editMode }">
      <Button label="Удалить" severity="danger" text v-if="editMode" />
      <Button label="Сохранить" />
    </div>
  </div>
</template>

<script setup lang='ts'>
const editMode = ref(false)
const props = defineProps(['order'])
const barbers = ['Аик', 'Мага', 'Снежанна']
const groupedServices = ref([
  {
    label: 'Стрижка',
    items: [
      { label: 'Под насадку' },
      { label: 'Под горшек' },
    ]
  },
  {
    label: 'Борода',
    items: [
      { label: 'Бритье' },
      { label: 'Расчесывание' },
    ]
  },
])
const statuses = ref([
  { name: 'Активен', code: 'active' },
  { name: 'Завершен', code: 'resolved' },
  { name: 'Отменен', code: 'rejected' },
])
const times = ref(['10:00', '10:30', '11:00', '11:30', '12:00'])
const orderData = reactive({
  name: '',
  phone: '',
  barber: '',
  services: [],
  status: 'active',
  date: '',
  time: '',
  price: '',
  comment: ''
})

onMounted(() => {
  if (props.order) {
    Object.assign(orderData, props.order)
    editMode.value = true
    if (props.order?.time) {
      const [date, time] = props.order.time.split(' ')
      orderData.time = time
      orderData.date = date.replaceAll('.', '/')
    }
  }
})

</script>

<style scoped lang='scss'></style>