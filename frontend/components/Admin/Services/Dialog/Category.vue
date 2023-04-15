<template>
  <div class="dialog__container">
    <InputText v-model="category" />
    <div class="flex gap-6 justify-between">
      <Button label="Удалить" severity="danger" text/>
      <Button label="Сохранить" :disabled="!category" />
    </div>
  </div>
</template>

<script setup lang='ts'>
const category = ref('')
const props = defineProps(['data'])
onMounted(() => {
  category.value = props.data
})
</script>

<style scoped lang='scss'></style>