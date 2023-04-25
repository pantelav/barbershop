<template>
  <div class="dialog__container">
    <InputText v-model="category" class="mb-4" />
    <Button class="h-11" label="Добавить" :disabled="!category" @click="createCategory" :loading="isLoading" />
  </div>
</template>

<script setup lang='ts'>
import { endpoints } from '@/constants/endpoints'
const emit = defineEmits(['close'])
const category = ref('')
const isLoading = ref(false)
async function createCategory () {
  try {
    isLoading.value = true
    await useApiFetch(endpoints.admin.category, { method: 'post', body: { title: category.value } })
    useNotify('success', 'Категория создана')
    emit('close')
  } catch (error) {
    useNotify('error', 'Не удалось создать категорию')
  } finally {
    isLoading.value = false
  }
}
</script>
