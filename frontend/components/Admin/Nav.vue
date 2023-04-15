<template>
  <nav class="nav">
    <nuxt-link to="/admin" @click="$emit('close')">Заказы</nuxt-link>
    <nuxt-link to="/admin/staff" @click="$emit('close')">Сотрудники</nuxt-link>
    <nuxt-link to="/admin/services" @click="$emit('close')">Услуги</nuxt-link>
  </nav>
</template>

<script setup lang='ts'>
defineEmits(['close'])
</script>

<style scoped lang='scss'>
.nav {
  padding-left: 30px;
  display: flex;
  flex-direction: column;
  row-gap: 20px;
  font-size: 24px;
}

a:hover {
  color: $orange;
}
</style>