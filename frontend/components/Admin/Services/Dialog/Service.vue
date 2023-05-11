<template>
  <div class="dialog__container">
    <span class="p-float-label mt-4 w-full">
        <InputText id="service" v-model="service.title" class="w-full" />
        <label for="service">Услгуа</label>
      </span>
      <span class="p-float-label mt-4">
        <InputText id="price" v-model="service.price" type="number" class="w-full" />
        <label for="price">Стоимость</label>
      </span>
      <span class="p-float-label mt-4">
        <InputText id="duration" v-model="service.duration" type="number" class="w-full" />
        <label for="duration">Продолжительность <b>в минутах</b></label>
      </span>
    <AppSpinner  v-if="isLoading"/>
    <div class="flex gap-6 justify-between" v-else>
      <Button label="Удалить" severity="danger" text @click="deleteService" />
      <Button label="Сохранить" :disabled="!(service.title && service.price)" @click="editService" />
    </div>
  </div>
</template>

<script setup lang='ts'>
import { endpoints } from '~/constants/endpoints';

const emit = defineEmits(['close'])
const props = defineProps(['data'])
const isLoading = ref(false)

const service = reactive({
  id: '',
  category: '',
  title: '',
  price: null,
  duration: null
})

onMounted(() => {
  // @ts-ignore
  // service.value.price = props.data.price as number
  // service.value.title = props.data.title as string
  // service.value.id = props.data.id as string
  // service.value.category = props.data.category as string
  Object.assign(service, props.data)
})

async function editService () {
  try {
    isLoading.value = true
    await useApiFetch(endpoints.admin.service, {
      method: 'put',
      params: {
        id: service.id
      },
      body: {
        title: service.title,
        price: service.price,
        category: service.category,
        duration: service.duration
      }
    })
    emit('close')
    useNotify('success', 'Услуга сохранена')
  } catch (error) {
    useNotify('error', 'Не удалось сохранить услугу')
  } finally {
    isLoading.value = false
  }
}

async function deleteService () {
  try {
    isLoading.value = true
    await useApiFetch(endpoints.admin.service, {
      method: 'delete',
      params: {
        id: service.id
      }
    })
    emit('close')
    useNotify('success', 'Услуга удалена')
  } catch (error) {
    useNotify('error', 'Не удалось удалить услугу')
  } finally {
    isLoading.value = false
  }
}
</script>
