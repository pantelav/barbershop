<template>
  <section class="section-dark py-20">
    <div class="_container flex flex-col justify-center items-center">
      <h2 class="pb-10">Наши услуги</h2>
      <div class="services">
        <div class="service">
          <nuxt-img src="/icons/scissors.svg" class="service__img" />
          <h3 class="service__title">Стрижка</h3>
          <p class="service__description">Любая стрижка на ваш вкус с последующим бритьем опасной бритвой и тонизированием
            кожи</p>
        </div>

        <div class="service">
          <nuxt-img src="/icons/comb.svg" class="service__img" />
          <h3 class="service__title">Моделирование бороды</h3>
          <p class="service__description">Любая стрижка на ваш вкус с последующим бритьем опасной бритвой и тонизированием
            кожи</p>
        </div>

        <div class="service">
          <nuxt-img src="/icons/blade.svg" class="service__img" />
          <h3 class="service__title">Бритье</h3>
          <p class="service__description">Любая стрижка на ваш вкус с последующим бритьем опасной бритвой и тонизированием
            кожи</p>
        </div>

        <div class="service">
          <nuxt-img src="/icons/dryer.svg" class="service__img" />
          <h3 class="service__title">Стайлинг</h3>
          <p class="service__description">Любая стрижка на ваш вкус с последующим бритьем опасной бритвой и тонизированием
            кожи</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang='ts'>

</script>

<style scoped lang="scss">
.services {
  width: 100%;
  display: grid;
  grid-template-rows: repeat(2, 1fr);
  grid-template-columns: repeat(2, 1fr);
  row-gap: 100px;
  column-gap: 100px;

  @media screen and (max-width: 765px) {
    display: block;

    .service:not(:last-child) {
      margin-bottom: 60px;
    }
  }
}

.service {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;

  .service__title {
    padding: 20px 0;
  }
}
</style>