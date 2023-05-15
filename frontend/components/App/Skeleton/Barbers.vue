<template>
  <div class="flex flex-col justify-center items-center" v-for="item in 6">
    <Skeleton shape="circle" class="mb-4 avatar"></Skeleton>
    <Skeleton width="5rem" border-radius="16px" class="text"></Skeleton>
  </div>
</template>

<style scoped lang="scss">
.avatar {
  width: 8rem !important;
  height: 8rem !important;

  @media screen and (max-width: 640px) {
    width: 20vw !important;
    height: 20vw !important;
  }
}

</style>