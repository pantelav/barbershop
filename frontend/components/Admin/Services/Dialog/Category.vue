<template>
  <div class="dialog__container">
    <InputText v-model="category.title" />
    <AppSpinner  v-if="isLoading"/>
    <div class="flex gap-6 justify-between" v-else>
      <Button label="Удалить" severity="danger" text @click="deleteCategory" />
      <Button label="Сохранить" :disabled="!category.title" @click="updateCategory" />
    </div>
  </div>
</template>

<script setup lang='ts'>
import { endpoints } from '~/constants/endpoints';

const emit = defineEmits(['close'])
const isLoading = ref(false)
const category = reactive({
  title: '',
  id: ''
})
const props = defineProps(['data'])
onMounted(() => {
  Object.assign(category, props.data)
})

async function updateCategory () {
  try {
    isLoading.value = true
    const { data } = await useApiFetch(endpoints.admin.category, {
      method: 'put',
      body: {
        title: category.title
      },
      params: {
        id: category.id
      },
    })
    emit('close')
    useNotify('success', 'Категория обновлена')
  } catch (error) {
    useNotify('error', 'Не удалось обновить категорию')
  } finally {
    isLoading.value = false
  }
}

async function deleteCategory () {
  try {
    isLoading.value = true
    await useApiFetch(endpoints.admin.category, {
      method: 'delete',
      params: {
        id: category.id
      },
    })
    emit('close')
    useNotify('success', 'Категория удалена')
  } catch (error) {
    useNotify('error', 'Не удалось удалить категорию')
  } finally {
    isLoading.value = false
  }
}

</script>

<style scoped lang='scss'></style>