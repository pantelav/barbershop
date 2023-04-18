<template>
  <div class="orders__container md:p-20 w-full">
    <DataTable :value="orders" v-model:filters="filter" responsiveLayout="stack" class="md:border shadow-xl"
      v-model:selection="selectedOrder" @row-select="showDialog" selectionMode="single" filterDisplay="menu">
      <template #header>
        <div class="flex flex-wrap items-center justify-between gap-2">
          <span class="text-xl font-bold">Заказы</span>
          <Button icon="pi pi-plus" rounded raised @click="showDialog" />
        </div>
        <div class="mt-5">
          <InputText placeholder="Поиск" v-model="filter['global'].value" />
        </div>
      </template>

      <Column field="name" header="Имя"></Column>
      <Column field="phone" header="Телефон">
        <template #body="slotProps">
          <a :href="`tel:${slotProps.data.phone}`">{{ slotProps.data.phone }}</a>
        </template>
      </Column>
      <Column field="time" header="Время" sortable></Column>
      <Column field="status" header="Статус">
        <template #body="slotProps">
          <AdminOrdersChip :status="slotProps.data.status" />
        </template>
      </Column>
    </DataTable>

    <Dialog v-model:visible="dialog" modal :draggable="false" @hide="selectedOrder = null">
      <AdminOrdersDialog :order="selectedOrder" />
    </Dialog>
  </div>
</template>

<script setup lang='ts'>
import { FilterMatchMode } from 'primevue/api'
definePageMeta({
  layout: 'admin'
})

const dialog = ref(false)
const selectedOrder = ref()

const filter = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  name: { value: null, matchMode: FilterMatchMode.CONTAINS },
  phone: { value: null, matchMode: FilterMatchMode.CONTAINS },
})

const orders = ref([
  {
    name: 'Иван',
    phone: '+79115555555',
    time: '20.04.2023 10:30',
    status: 'active',
    barber: 'Аик',
    services: [
      { label: 'Под насадку' },
      { label: 'Под горшек' },
    ],
    price: 1000
  },
  {
    name: 'Василий',
    phone: '+79116666666',
    time: '21.04.2023 11:00',
    status: 'rejected',
    barber: 'Аик',
    services: [
      { label: 'Бритье' },
      { label: 'Расчесывание' },
    ],
    price: 1000
  },
  {
    name: 'Дмитрий',
    phone: '+79111111111',
    time: '22.04.2023 10:00',
    status: 'resolved',
    barber: 'Аик',
    services: [],
    price: 1000
  },
])

function showDialog () {
  dialog.value = true
}
</script>

<style scoped lang='scss'></style>