<template>
  <div class="dialog__container">
    <InputText v-model="service.title" class="mb-4" placeholder="Услгуа" />
    <InputText v-model="service.price" type="number" class="mb-4" placeholder="Стоимость" />
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

const service = ref({
  id: '',
  category: '',
  title: '',
  price: null
})

onMounted(() => {
  // @ts-ignore
  service.value.price = props.data.price as number
  service.value.title = props.data.title as string
  service.value.id = props.data.id as string
  service.value.category = props.data.category as string
})

async function editService () {
  try {
    isLoading.value = true
    await useApiFetch(endpoints.admin.service, {
      method: 'put',
      params: {
        id: service.value.id
      },
      body: {
        title: service.value.title,
        price: service.value.price,
        category: service.value.category,
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
        id: service.value.id
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
