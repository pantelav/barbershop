<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: "Men's Id Барбершоп",
  meta: [
    { name: 'description', content: 'Новый барбершоп для мужчин, которые ценят премиальное качество, время и безупречный внешний вид.' },
    { name: 'keywords', content: 'барбершоп, стрижка, стиль, красота, парикмахерска, мужчина, mens-id, СПб, Оптиков' },
    { name: 'msapplication-TileColor', content: '#da532c' },
    { name: 'theme-color', content: '#ffffff' },
  ],
  link: [
    { rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png" },
    { rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon-32x32.png" },
    { rel: "icon", type: "image/png", sizes: "16x16", href: "/favicon-16x16.png" },
    { rel: "manifest", href: "/site.webmanifest" },
    { rel: "mask-icon", href: "/safari-pinned-tab.svg", color: "#5bbad5" },
  ]
})
</script>