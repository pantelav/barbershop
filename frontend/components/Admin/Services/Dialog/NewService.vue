<template>
  <div class="dialog__container">
    <InputText v-model="service.title" class="mb-4" placeholder="Услгуа" />
    <InputText v-model="service.price" type="number" class="mb-4" placeholder="Стоимость" />
    <Button class="h-11" label="Добавить" :disabled="!(service.title && service.price)" />
  </div>
</template>

<script setup lang='ts'>
const service = ref({
  title: '',
  price: null
})
</script>
