<template>
  <button class="enroll" @click="dialog = true">Записаться</button>
  <Dialog v-model:visible="dialog" modal header="Записаться онлайн" :style="{ width: '50vw' }"
    :breakpoints="{ '960px': '75vw', '641px': '100vw' }" :draggable="false" @show="clearState" @hide="clearState">
    <AppOrderForm modal />
  </Dialog>
</template>

<script setup lang='ts'>
const dialog = ref(false)
function clearState () {
  useClearState()
}
</script>

<style scoped lang="scss"></style>