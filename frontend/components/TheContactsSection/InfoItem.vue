<template>
  <a :href="props.url" class="item">
    <NuxtImg :src="props.src" :alt="props.alt" class="img" />
    <p class="label">{{ props.label }}</p>
  </a>
</template>

<script setup lang='ts'>
const props = defineProps({
  src: String,
  label: String,
  alt: {
    type: String,
    default: 'icon'
  },
  url: {
    type: String,
    default: '/'
  },
})
</script>

<style scoped lang='scss'>
.item {
  display: grid;
  grid-template-columns: 30px 1fr;

  &:not(:last-child) {
    margin-bottom: 20px;
  }

  .img {
    justify-self: center;
  }
}

.label {
  padding-left: 20px;
  font-family: "Bitter", serif;
}
</style>