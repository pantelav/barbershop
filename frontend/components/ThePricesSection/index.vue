<template>
  <section class="prices section-dark">
    <div class="_container my-20">
      <h2 class="w-full text-center pb-10">Цены</h2>
      <div class="services__container">
        <template v-for="category in data">
          <ThePricesSectionCategoryList :category="category" />
        </template>
      </div>
    </div>
  </section>
</template>

<script setup lang='ts'>
const data = ref([
  {
    title: "Стрижка",
    services: [
      {
        title: "Под насадку",
        price: 500
      },
      {
        title: "С переходами",
        price: 1000
      },
      {
        title: "Стрижка всеми инструментами",
        price: 1000
      },
    ]
  },
  {
    title: "Стрижка",
    services: [
      {
        title: "Под насадку",
        price: 500
      },
      {
        title: "С переходами",
        price: 1000
      },
      {
        title: "Стрижка всеми инструментами",
        price: 1000
      },
    ]
  },
  {
    title: "Стрижка",
    services: [
      {
        title: "Под насадку",
        price: 500
      },
      {
        title: "С переходами",
        price: 1000
      },
      {
        title: "Стрижка всеми инструментами",
        price: 1000
      },
    ]
  },
  {
    title: "Стрижка",
    services: [
      {
        title: "Под насадку",
        price: 500
      },
      {
        title: "С переходами",
        price: 1000
      },
      {
        title: "Стрижка всеми инструментами",
        price: 1000
      },
    ]
  },
])
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