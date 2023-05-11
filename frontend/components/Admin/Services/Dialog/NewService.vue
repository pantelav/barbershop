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
    <Button class="h-11" label="Добавить" :disabled="!(service.title && service.price)" @click="createService" />
  </div>
</template>

<script setup lang='ts'>
import { endpoints } from '~/constants/endpoints';

const emit = defineEmits(['close'])
const props = defineProps(['data'])
const catId = ref()
const service = reactive({
  title: '',
  price: null,
  duration: null
})

onMounted(() => {
  catId.value = props.data
})

async function createService () {
  try {
    await useApiFetch(endpoints.admin.service, {
      method: 'post',
      body: {
        title: service.title,
        price: service.price,
        category: catId.value,
        duration: service.duration
      }
    })
    emit('close')
    useNotify('success', 'Услуга создана')
  } catch (error) {
    useNotify('error', 'Не удалось создать услугу')
  }
}
</script>
