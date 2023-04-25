<template>
  <div class="dialog__container">
    <InputText v-model="service.title" class="mb-4" placeholder="Услгуа" />
    <InputText v-model="service.price" type="number" class="mb-4" placeholder="Стоимость" />
    <Button class="h-11" label="Добавить" :disabled="!(service.title && service.price)" @click="createService"/>
  </div>
</template>

<script setup lang='ts'>
import { endpoints } from '~/constants/endpoints';

const emit = defineEmits(['close'])
const props = defineProps(['data'])
const catId = ref()
const service = ref({
  title: '',
  price: null
})

onMounted(() => {
  catId.value = props.data
})

async function createService() {
  try {
    await useApiFetch(endpoints.admin.service, {
      method: 'post',
      body: {
        title: service.value.title,
        price: service.value.price,
        category: catId.value
      }
    })
    emit('close')
    useNotify('success', 'Услуга создана')
  } catch (error) {
    useNotify('error', 'Не удалось создать услугу')
  }
}
</script>
