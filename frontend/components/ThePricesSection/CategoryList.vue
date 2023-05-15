<template>
  <div class="list">
    <h3 class="list__title">{{ props.category.title }}</h3>
    <div class="list__services">
      <div class="service" v-for="item in props.category.services" :key="item.title">
        <p class="service__title pr-3">{{ item.title }}</p>
        <p class="service__price whitespace-nowrap">{{ item.price }} руб.</p>
      </div>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { ICategoryWithServices } from '~/types/service'

const props = defineProps<{
  category: ICategoryWithServices
}>()
</script>

<style scoped lang='scss'>
.list {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.list__title {
  color: $orange;
  font-size: 32px;
  margin-bottom: 10px;
}

.list__services {
  width: 100%;
}

.service {
  display: flex;
  justify-content: space-between;
  align-items: center;

  &:not(:last-child) {
    margin-bottom: 20px;
  }
}
</style>