<template>
  <div class="staff__container md:p-20 w-full">
    <DataTable :value="staff" class="md:border shadow-xl" v-model:filters="filter" v-model:selection="selectedPerson"
      @row-select="showDialog(true)" selectionMode="single" responsiveLayout="stack">
      <template #header>
        <div class="flex flex-wrap items-center justify-between gap-2">
          <span class="text-xl font-bold">Сотрудники</span>
          <Button icon="pi pi-plus" rounded raised @click="showDialog(false)" />
        </div>
        <div class="mt-5">
          <InputText placeholder="Поиск по имени" v-model="filter['name'].value" />
        </div>
      </template>
      <Column v-for="col in columns" :key="col.field" :field="col.field" :header="col.header"
        :sortable="col.field !== 'avatar'">
        <template v-if="col.field === 'name'" #body="slotProps">
          <span
            class="pl-3 md:pl-0">{{ `${slotProps.data?.lastName || ''} ${slotProps.data?.firstName || ''} ${slotProps.data?.thirdName || ''}` }}</span>
        </template>
        <template v-if="col.field === 'avatar'" #body="slotProps">
          <NuxtImg :src="slotProps.data.avatar" width="50" fit="cover" />
        </template>
        <template v-if="col.field === 'status'" #body="slotProps">
          <div v-if="slotProps.data.active" class="status-round bg-green-500">
            <i class="pi pi-check"></i>
          </div>
          <div v-else class="status-round bg-red-600">
            <i class="pi pi-times"></i>
          </div>
        </template>
      </Column>
    </DataTable>
    <Dialog v-model:visible="dialog" modal :header="dialogHeader" :draggable="false" @hide="selectedPerson = null">
      <AdminStaffDialog :user="selectedPerson" />
    </Dialog>
  </div>
</template>

<script setup lang='ts'>
import { FilterMatchMode } from 'primevue/api'
definePageMeta({
  layout: 'admin'
})

const dialog = ref(false)
const selectedPerson = ref()
const dialogHeader = ref('')

const columns = [
  { field: 'name', header: "Имя" },
  { field: 'avatar', header: "Фото" },
  { field: 'category', header: "Категория" },
  { field: 'status', header: "Активен" },
]

const staff = ref([
  {
    lastName: 'Иванов',
    firstName: 'Иван',
    thirdName: 'Иванович',
    avatar: '/icons/man-face.svg',
    category: "Модератор",
    active: true
  },
  {
    lastName: 'Петров',
    firstName: 'Иван',
    thirdName: 'Иванович',
    avatar: '/icons/man-face.svg',
    category: "Барбер",
    active: true
  },
  {
    lastName: 'Голубков',
    firstName: 'Иван',
    thirdName: 'Иванович',
    avatar: '/icons/man-face.svg',
    category: "Барбер",
    active: false
  },
  {
    lastName: 'Иванов',
    firstName: 'Иван',
    thirdName: 'Иванович',
    avatar: '/icons/man-face.svg',
    category: "Барбер",
    active: true
  },
])

const filter = ref({
  name: { value: null, matchMode: FilterMatchMode.CONTAINS }
})

function showDialog (edit = false) {
  dialog.value = true
  edit ? dialogHeader.value = 'Редактировать' : dialogHeader.value = 'Добавить'
}
</script>

<style scoped lang='scss'>
.status-round {
  width: 25px;
  height: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  border-radius: 100px;
}
</style>