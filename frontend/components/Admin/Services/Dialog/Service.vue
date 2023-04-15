<template>
  <div class="dialog__container">
    <InputText v-model="service.title" class="mb-4" placeholder="Услгуа" />
    <InputText v-model="service.price" type="number" class="mb-4" placeholder="Стоимость" />
    <div class="flex gap-6 justify-between">
      <Button label="Удалить" severity="danger" text />
      <Button label="Сохранить" :disabled="!(service.title && service.price)" />
    </div>
  </div>
</template>

<script setup lang='ts'>
const props = defineProps(['data'])

const service = ref({
  title: '',
  price: null
})

onMounted(() => {
  service.value.title = props.data.title as string
  // @ts-ignore
  service.value.price = props.data.price as number
})
</script>

<style scoped lang='scss'></style>