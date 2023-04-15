<template>
  <div class="page">
    <TheHeader class="header" />
    <main class="main">
      <TheHeroSection id="hero"/>
      <TheOpeningSection id="new"/>
      <TheServicesSection id="services"/>
      <TheOrderSection id="order"/>
      <ThePricesSection id="prices"/>
      <TheContactsSection id="contacts"/>
      <TheMapSection />
      <TheFooter/>
    </main>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'default'
})
</script>

<style scoped lang="scss">
.header {
  position: fixed;
}

.main {
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
}
</style>