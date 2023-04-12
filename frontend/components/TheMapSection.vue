<template>
  <!-- <iframe src="https://yandex.ru/map-widget/v1/?um=constructor%3A01c767ef682c1951ae6477f4b390e46b96bbfa9622d09b082c4cbb289325e55b&amp;source=constructor" width="100%" height="400" frameborder="0"></iframe> -->
  <div class="w-full">
    <ClientOnly>
      <YandexMap :coordinates="coordinates" :zoom="15">
        <YandexMarker :coordinates="coordinates" :marker-id="123"></YandexMarker>
      </YandexMap>
    </ClientOnly>
  </div>
</template>

<script setup lang='ts'>
import { YandexMap, YandexMarker } from 'vue-yandex-maps'
const coordinates = ref([60.002324, 30.205681])
</script>

<style scoped lang='scss'>
.yandex-container {
  width: 100%;
  height: 500px;
  display: block;
  margin: 0 auto;

  @media screen and (max-width: 650px) {
    height: 300px;
  }
}
</style>