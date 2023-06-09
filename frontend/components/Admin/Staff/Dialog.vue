<template>
  <form @submit.prevent enctype="multipart/form-data" class="staff__dialog flex flex-col gap-4 xs:w-[300px] w-[80vw]">
    <InputText placeholder="Имя" v-model="userData.name" />

    <span>Пол</span>
    <div class="flex flex-wrap gap-10">
      <div class="flex items-center">
        <RadioButton v-model="userData.gender" input-id="m" name="m" value="m" />
        <label for="m" class="ml-2">М</label>
      </div>
      <div class="flex items-center">
        <RadioButton v-model="userData.gender" input-id="f" name="f" value="f" />
        <label for="f" class="ml-2">Ж</label>
      </div>
    </div>

    <div class="flex items-center gap-5">
      <div class="flex items-center">
        <RadioButton v-model="userData.isActive" input-id="active" name="active" :value="true" />
        <label for="active" class="ml-2">Активен</label>
      </div>
      <div class="flex items-center">
        <RadioButton v-model="userData.isActive" input-id="extinct" name="extinct" :value="false" />
        <label for="extinct" class="ml-2">Отключен</label>
      </div>
    </div>

    <Dropdown v-model="userData.role" :options="categories" option-label="name" option-value="value"
      placeholder="Выберите категорию" />

    <span>Рабочие дни</span>
    <div class="flex gap-3 flex-wrap">
      <div class="flex items-center">
        <Checkbox v-model="userData.workdays" input-id="mon" :value="1" />
        <label for="mon" class="ml-2">Пн</label>
      </div>
      <div class="flex items-center">
        <Checkbox v-model="userData.workdays" input-id="tue" :value="2" />
        <label for="tue" class="ml-2">Вт</label>
      </div>
      <div class="flex items-center">
        <Checkbox v-model="userData.workdays" input-id="wed" :value="3" />
        <label for="wed" class="ml-2">Ср</label>
      </div>
      <div class="flex items-center">
        <Checkbox v-model="userData.workdays" input-id="thu" :value="4" />
        <label for="thu" class="ml-2">Чт</label>
      </div>
      <div class="flex items-center">
        <Checkbox v-model="userData.workdays" input-id="fri" :value="5" />
        <label for="fri" class="ml-2">Пт</label>
      </div>
      <div class="flex items-center">
        <Checkbox v-model="userData.workdays" input-id="sat" :value="6" />
        <label for="sat" class="ml-2">Сб</label>
      </div>
      <div class="flex items-center">
        <Checkbox v-model="userData.workdays" input-id="sun" :value="0" />
        <label for="sun" class="ml-2">Вс</label>
      </div>
    </div>

    <span>Фото</span>
    <FileUpload mode="basic" name="avatar" @select="fileChange($event)" accept="image/*" :max-file-size="10000000"
      chooseLabel="Выбрать файл" />

    <AppSpinner v-if="isLoading" />
    <div class="dialog__actions flex justify-between items-center mt-6" v-else>
      <Button label="Удалить" severity="danger" text v-if="props.user" @click="deleteStaff" />
      <Button label="Сохранить" :class="{ 'w-full': !props.user }" :disabled="!userData.name"
        @click="props?.user ? editStaff() : createStaff()" />
    </div>
  </form>
</template>

<script setup lang='ts'>
import { endpoints } from '~/constants/endpoints';

const emit = defineEmits(['close'])
const props = defineProps(['user'])
const isLoading = ref(false)
const categories = ref([
  { name: 'Барбер', value: 'barber' },
  { name: 'Модератор', value: 'moderator' },
])
const userData = reactive({
  name: '',
  gender: 'm',
  role: 'barber',
  isActive: true,
  avatar: '',
  workdays: [1, 2, 3, 4, 5]
})
const file = ref()
onMounted(() => {
  if (props.user) {
    Object.assign(userData, props.user)
  }
})

async function createStaff () {
  try {
    isLoading.value = true
    const formData = createForm()
    await useApiFetch(endpoints.admin.staff, {
      method: 'post',
      body: formData
    })
    emit('close')
    useNotify('success', 'Сотрудник добавлен')
  } catch (error) {
    useNotify('error', 'Ошибка сохранения')
  } finally {
    isLoading.value = false
  }
}

async function editStaff () {
  try {
    isLoading.value = true
    const formData = createForm()
    await useApiFetch(endpoints.admin.staff, {
      method: 'put',
      body: formData,
      params: {
        id: props.user.id
      },
    })
    emit('close')
    useNotify('success', 'Изменения сохранены')
  } catch (error) {
    useNotify('error', 'Ошибка сохранения')
  } finally {
    isLoading.value = false
  }
}

async function deleteStaff () {
  try {
    isLoading.value = true
    await useApiFetch(endpoints.admin.staff, {
      method: 'delete',
      params: {
        id: props.user.id
      }
    })
    emit('close')
    useNotify('success', 'Изменения сохранены')
  } catch (error) {
    useNotify('error', 'Ошибка Удаления')
  } finally {
    isLoading.value = false
  }
}

// @ts-ignore
function fileChange (event) {
  const inputFile = event.files[0]
  file.value = inputFile
}

function createForm () {
  const formData = new FormData()
  for (const key in userData) {
    // @ts-ignore
    formData.append(key, userData[key])
  }
  if (file.value) formData.append('image', file.value)
  return formData
}
</script>

<style scoped lang='scss'></style>