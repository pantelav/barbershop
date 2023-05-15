<template>
  <div v-if="isLoading" class="barber__container">
    <AppSkeletonBarbers />
  </div>
  <div class="barber__container mt-5" v-else>
    <template v-for="barber in barbers" :key="barber.id">
      <AppOrderFormBarberCard :barber="barber"/>
    </template>
  </div>
</template>

<script setup lang='ts'>
import { endpoints } from '~/constants/endpoints';
import { IBarber } from '~/types/staff'
const barbers = ref<IBarber[] | null>()
const isLoading = ref(false)
onMounted(async () => {
  try {
    isLoading.value = true
    const { data } = await useApiFetch<IBarber[] | null>(endpoints.client.barbers)
    barbers.value = data.value
  } catch (error) {
    useNotify('error', 'Ошибка загрузки данных')
  } finally {
    isLoading.value = false
  }
})
</script>

<style scoped lang="scss">
.barber__container {
  width: 100%;
  margin-top: 20px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-column-gap: 20px;
  grid-row-gap: 20px;
  align-content: space-around;
  justify-content: space-between;
  overflow-y: scroll;

  @media screen and (max-width: 380px) {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>