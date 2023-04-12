<template>
  <section class="relative open-section z-0">
    <div class="_container section__container" title="open">
      <div class="content pr-5">
        <h2 class="mb-10">Новый барбершоп на Пионерской</h2>
        <p>Наш барбершоп — это территория для мужчин, которые ценят премиальное качество, время и безупречный внешний
          вид.Добавь свое...</p>
      </div>
      <div class="empty "></div>
    </div>
  </section>
</template>

<script setup lang='ts'>

</script>

<style scoped lang="scss">
.open-section {
  background: top right / 50% no-repeat url('/img/barber.webp');
  background-position: 50vw;

  @media screen and (max-width: 510px) {
    background-image: url('/img/barber-dark.webp');
    background-size: 100%;
    background-position: center;
  }

  @media screen and (max-width: 350px) {
    background-size: cover;
    background-position: center;
  }
}

.section__container {
  height: 796px;

  @media screen and (max-width: 1070px) {
    height: 500px;
  }

  @media screen and (max-width: 670px) {
    height: auto;
    padding: 30px 25px;
  }
}

.content {
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media screen and (max-width: 510px) {
    width: 100%;
    text-align: center;
    padding: 130px 0;

    p {
      text-align: justify;
    }
  }
}

.empty {
  width: 50%;

  @media screen and (max-width: 510px) {
    display: none;
  }
}

.section__bg {
  position: absolute;
  top: 0;
  right: 0;
  width: 50%;
  height: inherit;

  .bg {
    width: 100%;
    object-fit: contain;
    object-position: center;
  }
}
</style>