<template>
  <section class="order__section py-10">
    <div class="_container section__container">
      <div class="text">
        <h2 class="lg:pb-7">ЗАПИСЬ ОНЛАЙН</h2>
        <p class="lg:pb-0 pb-3">Обслужим в удобное для Вас вермя</p>
      </div>

      <div class="form__container flex justify-center">
        <AppOrderForm />
      </div>
    </div>
  </section>
</template>

<script setup lang='ts'>

</script>

<style scoped lang="scss">
.order__section {
  background: top center / cover no-repeat url('/img/room.webp');

  @media screen and (max-width: 520px) {
    background: none;
  }
}

.text {
  @media screen and (max-width: 1024px) {
    text-align: center;
  }
}

.section__container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  align-items: center;

  @media screen and (max-width: 1024px) {
    display: block;
  }
}
</style>