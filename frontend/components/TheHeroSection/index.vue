<template>
  <section class="hero">
    <div class="_container hero__container flex flex-col justify-center items-center text-center">
      <h1>Твой уникальный стиль</h1>
      <p class="hero__subtitle mt-3 mb-5">мы лучшие, а Вы прекрасны</p>
      <!-- <button class="enroll">Записаться</button> -->
      <AppEnrollBtn />
    </div>
  </section>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
.hero {
  width: 100%;
  height: 100vh;
  background: center / cover no-repeat url('/img/hero.jpg');
}

.hero__container {}

.hero__subtitle {
  font-weight: 500;
  font-size: 36px;

  @media screen and (max-width: 1200px) {
    font-size: 4vw;
  }
}
</style>