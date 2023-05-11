<template>
  <div class="staff__container md:p-20 w-full">
    <DataTable :value="staff" class="md:border shadow-xl" v-model:filters="filter" v-model:selection="selectedPerson"
      @row-select="showDialog(true)" selectionMode="single" responsiveLayout="stack" :loading="isLoading">
      <template #header>
        <div class="flex flex-wrap items-center justify-between gap-2">
          <span class="text-xl font-bold">Сотрудники</span>
          <Button icon="pi pi-plus" rounded raised @click="showDialog(false)" />
        </div>
        <div class="mt-5">
          <InputText placeholder="Поиск по имени" v-model="filter['name'].value" />
        </div>
      </template>
      <template #empty>
        <p class="text-center">Добавьте персонал</p>
      </template>

      <Column v-for="col in columns" :key="col.field" :field="col.field" :header="col.header"
        :sortable="col.field !== 'avatar'">
        <template v-if="col.field === 'name'" #body="slotProps">
          <span class="pl-3 md:pl-0 font-bold">{{ `${slotProps.data?.name || ''}` }}</span>
        </template>
        <template v-if="col.field === 'avatar'" #body="slotProps">
          <NuxtImg :src="getAvatarUrl(slotProps.data)" width="70" height="70" fit="cover" />
          <!-- <img :src="getAvatarUrl(slotProps.data)" alt="" srcset="" class="avatar"> -->
        </template>
        <template v-if="col.field === 'category'" #body="slotProps">
          <p>{{ slotProps.data?.role === 'barber' ? 'Барбер' : 'Модератор' }}</p>
        </template>
        <template v-if="col.field === 'status'" #body="slotProps">
          <div v-if="slotProps.data.isActive" class="status-round bg-green-500">
            <i class="pi pi-check"></i>
          </div>
          <div v-else class="status-round bg-red-600">
            <i class="pi pi-times"></i>
          </div>
        </template>
      </Column>
    </DataTable>
    <Dialog v-model:visible="dialog" modal :header="dialogHeader" :draggable="false" @hide="selectedPerson = null">
      <AdminStaffDialog :user="selectedPerson" @close="fetchStaff" />
    </Dialog>
  </div>
</template>

<script setup lang='ts'>
import { FilterMatchMode } from 'primevue/api'
import { endpoints } from '@/constants/endpoints'
definePageMeta({
  layout: 'admin'
})

const isLoading = ref(true)
const dialog = ref(false)
const selectedPerson = ref()
const dialogHeader = ref('')

const columns = [
  { field: 'name', header: "Имя" },
  { field: 'avatar', header: "Фото" },
  { field: 'category', header: "Категория" },
  { field: 'status', header: "Активен" },
]

const staff = ref()

const filter = ref({
  name: { value: null, matchMode: FilterMatchMode.CONTAINS }
})

onMounted(async () => {
  await fetchStaff()
})

async function fetchStaff () {
  try {
    isLoading.value = true
    const { data } = await useApiFetch(endpoints.admin.staff)
    staff.value = toRaw(data.value)
    if (staff.value?.message === 'Нет записей') staff.value = null
  } catch (error) {
    useNotify('error', 'Ошибка сервера')
  } finally {
    isLoading.value = false
    dialog.value = false
  }
}

function showDialog (edit = false) {
  dialog.value = true
  edit ? dialogHeader.value = 'Редактировать' : dialogHeader.value = 'Добавить'
}

function getAvatarUrl (data: any) {
  if (data?.avatar) return data.avatar
  if (data.gender === 'f') {
    return '/icons/woman-face.svg'
  } else {
    return '/icons/man-face.svg'
  }
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

.avatar {
  height: 90px;
  width: 90px;
  border-radius: 100px;
  object-fit: cover;
}
</style>