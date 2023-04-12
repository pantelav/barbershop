<template>
  <div class="nav__container">
    <TheHeaderNav @close="$emit('close')"/>
  </div>
</template>

<script setup lang='ts'>
const emit = defineEmits(['close'])
</script>

<style scoped lang="scss">
.nav__container {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  font-size: 24px;
  font-weight: 600;
  transition: all .2s;
}
</style>