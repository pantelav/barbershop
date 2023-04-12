<template>
  <section>
    <div class="_container my-20">
      <h2 class="text-center pb-10">Контакты</h2>
      <div class="contacts">
        <div class="contacts__img">
          <nuxt-img src="/img/side.jpg" loading="lazy" alt="photo"/>
        </div>

        <div class="contacts__info">
          <template v-for="item in items" :key="item.src">
            <TheContactsSectionInfoItem :src="item.src" :alt="item.alt" :label="item.label" />
          </template>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang='ts'>
const items = ref([
  {
    src: '/icons/social/geo.svg',
    alt: 'geo',
    label: 'г. Санкт-Петербург, ул. Оптиков, д.45, к.1',
    url: '/'
  },
  {
    src: '/icons/social/mobile.svg',
    alt: 'mobile',
    label: '+7 (911) 111-11-11',
    url: 'tel:+79111111111'
  },
  {
    src: '/icons/social/tg.svg',
    alt: 'telegram',
    label: '@mensid',
    url: '/'
  },
  {
    src: '/icons/social/insta.svg',
    alt: 'instagramm',
    label: "Men's id",
    url: '/'
  },
  {
    src: '/icons/social/vk.svg',
    alt: 'vk',
    label: "Men's id",
    url: '/'
  },
  {
    src: '/icons/social/time.svg',
    alt: 'time',
    label: "Ежедневно:  10:00 - 22:00",
    url: '/'
  },
])
</script>

<style scoped lang='scss'>
.contacts {
  width: 100%;
  display: flex;
  align-items: center;

  div {
    flex-basis: 50%;
  }

  @media screen and (max-width: 700px) {
    flex-direction: column-reverse;

    .contacts__info {
      margin-bottom: 20px;
      padding-left: 0;
    }
  }
}

.contacts__info {
  padding-left: 40px;
  display: flex;
  flex-direction: column;

  @media screen and (max-width: 500px) {
    justify-content: start;
  }
}
</style>