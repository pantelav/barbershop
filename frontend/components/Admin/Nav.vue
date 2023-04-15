<template>
  <nav class="nav">
    <nuxt-link to="/admin">Заказы</nuxt-link>
    <nuxt-link to="/admin/staff">Сотрудники</nuxt-link>
    <nuxt-link to="/admin/services">Услуги</nuxt-link>
  </nav>
</template>

<script setup lang='ts'>

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