<template>
    <div class="skeleton">
      <Skeleton class="mb-2" width="10rem" height="2rem"></Skeleton>
      <Skeleton class="mb-2" width="100%"></Skeleton>
      <Skeleton class="mb-2" width="100%"></Skeleton>
      <Skeleton class="mb-2" width="100%"></Skeleton>
    </div>
</template>

<script setup lang='ts'>

</script>

<style scoped lang='scss'>
.skeleton {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>