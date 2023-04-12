<template>
  <header ref="header" class="header md:h-20 h-14 w-full flex justify-center items-center z-10 transition-all"
    :class="{ 'backdrop-blur-md': !onTop }">
    <div class="header__container _container flex justify-between items-center h-full">
      <div class="logo">
        <nuxt-img src="/img/logo-long.png" format="webp" class="lg:block hidden h-20" />
        <nuxt-img src="/img/logo-sm.png" format="webp" class="block lg:hidden md:h-20 h-14" />
      </div>
      <div class="nav items-center gap-9 pl-3 sm:flex hidden">
        <TheHeaderNav />
      </div>
      <div class="nav-mobile sm:hidden flex justify-center items-center h-full">
        <TheHeaderBurgerBtn @click="sidebar = true" />
      </div>
    </div>
    <Sidebar v-model:visible="sidebar" position="right" :block-scroll="true">
      <TheHeaderSidebarContent @close="sidebar = false" />
    </Sidebar>
  </header>
</template>

<script setup lang='ts'>
const sidebar = ref(false)
const header = ref<HTMLElement | null>(null)
const onTop = ref(true)
onMounted(() => {
  if (window.pageYOffset > 0) onTop.value = false
  window.addEventListener('scroll', () => {
    window.pageYOffset > 0 ? onTop.value = false : onTop.value = true
  })
})
</script>

<style scoped lang="scss"></style>