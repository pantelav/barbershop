<template>
  <section class="prices section-dark">
    <div class="_container my-20">
      <h2 class="w-full text-center pb-10">Цены</h2>
      <div class="services__container">
        <template v-for="category in services" v-if="services && !isLoading">
          <ThePricesSectionCategoryList :category="category" />
        </template>
        <template v-else>
          <AppSkeletonPrices/>
          <AppSkeletonPrices/>
          <AppSkeletonPrices/>
          <AppSkeletonPrices/>
        </template>
      </div>
    </div>
  </section>
</template>

<script setup lang='ts'>
import { endpoints } from '~/constants/endpoints'
import { ICategoryWithServices } from '~/types/service'

const services = ref<ICategoryWithServices[] | null>(null)
const isLoading = ref(false)

onMounted(async () => {
  try {
    isLoading.value = true
    const { data, error } = await useApiFetch<ICategoryWithServices[]>(endpoints.client.services)
    if (error.value) useNotify('error', 'Ошибка загрузки данных')
    services.value = data.value
  } catch (error) {

  } finally {
    isLoading.value = false
  }
})
</script>

<style scoped lang='scss'>
.services__container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 90px;
  row-gap: 50px;

  @media screen and (max-width: 1024px) {
    column-gap: 50px;
  }

  @media screen and (max-width: 850px) {
    grid-template-columns: 1fr;
  }
}
</style>