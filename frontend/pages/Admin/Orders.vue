<template>
  <div class="orders__container md:p-20 w-full">
    <DataTable :value="orders" v-model:filters="filter" responsiveLayout="stack" class="md:border shadow-xl"
      v-model:selection="selectedOrder" @row-select="showDialog" selectionMode="single" filterDisplay="menu"
      :loading="isLoading">
      <template #header>
        <div class="flex flex-wrap items-center justify-between gap-2">
          <span class="text-xl font-bold">Заказы</span>
          <Button icon="pi pi-plus" rounded raised @click="showDialog" />
        </div>
        <div class="mt-5">
          <InputText placeholder="Поиск" v-model="filter['global'].value" />
        </div>
      </template>

      <template #empty>
        <p class="text-center">Заказов пока нет</p>
      </template>

      <Column field="name" header="Имя"></Column>
      <Column field="phone" header="Телефон">
        <template #body="slotProps">
          <a :href="`tel:${slotProps.data.phone}`">{{ slotProps.data.phone }}</a>
        </template>
      </Column>
      <Column field="date" header="Время" sortable>
        <template #body="slotProps">
          <p>{{ getDateTime(slotProps.data.date) }}</p>
        </template>
      </Column>
      <Column field="status" header="Статус">
        <template #body="slotProps">
          <AdminOrdersChip :status="slotProps.data.status" />
        </template>
      </Column>
    </DataTable>

    <Dialog v-model:visible="dialog" modal :draggable="false" @hide="selectedOrder = null">
      <AdminOrdersDialog :order="selectedOrder" @close="fetchOrders" />
    </Dialog>
  </div>
</template>

<script setup lang='ts'>
import { FilterMatchMode } from 'primevue/api'
import { endpoints } from '~/constants/endpoints';
import { IOrder } from '~/types/order'
import { IStaff } from '~/types/staff';
definePageMeta({
  layout: 'admin'
})

const isLoading = ref(false)
const dialog = ref(false)
const selectedOrder = ref()
const orders = ref()

const filter = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  name: { value: null, matchMode: FilterMatchMode.CONTAINS },
  phone: { value: null, matchMode: FilterMatchMode.CONTAINS },
})

onMounted(async () => {
  await fetchOrders()
})

async function fetchOrders () {
  try {
    isLoading.value = true
    const { data }: { data: Ref<IOrder[] | null> } = await useApiFetch(endpoints.admin.orders)
    if (data.value !== null) orders.value = toRaw(data.value)
    dialog.value = false
  } catch (error) {
    useNotify('error', 'Ошибка загрузки данных')
  } finally {
    isLoading.value = false
  }
}

function showDialog () {
  dialog.value = true
}

function getDateTime (date: string) {
  const dateObject = new Date(date)
  return dateObject.toLocaleString([], { day: '2-digit', month: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit' })
} 
</script>

<style scoped lang='scss'></style>