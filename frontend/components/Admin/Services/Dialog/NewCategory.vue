<template>
  <div class="dialog__container">
    <InputText v-model="category" class="mb-4" />
    <Button class="h-11" label="Добавить" :disabled="!category" />
  </div>
</template>

<script setup lang='ts'>
const category = ref('')
</script>

<style scoped lang='scss'></style>