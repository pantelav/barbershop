<template>
  <a href="#services" class="nav__link" @click="$emit('close')">Услуги</a>
  <a href="#prices" class="nav__link" @click="$emit('close')">Цены</a>
  <a href="#contacts" class="nav__link" @click="$emit('close')">Контакты</a>
  <a href="#" class="nav__link" @click="$emit('close')">Вход</a>
  <AppEnrollBtn />
</template>

<script setup lang='ts'>
const emit = defineEmits(['close'])
</script>

<style scoped lang="scss">
.nav__link {
  transition: all .150s;

  &:hover {
    color: $orange;
  }
}

.btn-nav {
  @media screen and (max-width: 700px) {
    font-size: 16px;
  }
}
</style>