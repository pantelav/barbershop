<template>
  <div class="barber__container mt-5">
    <AppOrderFormBarberCard name="Иван" />
    <AppOrderFormBarberCard name="Иван" gender="w" />
    <AppOrderFormBarberCard name="Иван" />
    <AppOrderFormBarberCard name="Иван" />
    <AppOrderFormBarberCard name="Иван" />
    <AppOrderFormBarberCard name="Иван" />
  </div>
</template>

<script setup lang='ts'>
</script>

<style scoped lang="scss">
.barber__container {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-column-gap: 20px;
  grid-row-gap: 20px;
  align-content: space-around;
  justify-content: space-between;
}
</style>