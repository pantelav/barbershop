<template>
  <footer class="footer">
    <div class="_container footer__container">
      <div>©Men’s ID 2023</div>
      <a href="#" class="logo">
        <NuxtImg src="/img/logo-long.png" width="400" alt="logo" />
      </a>
      <div>ИП Иванов Иван Иванович</div>
      <div class="info text-gray-400">
        <p>Created by: <a href="https://github.com/pantelav" target="_blank"
            class="underline hover:text-blue-500">pantela</a></p>
      </div>
    </div>
  </footer>
</template>

<script setup lang='ts'>

</script>

<style scoped lang='scss'>
.footer {
  height: 250px;
  display: flex;
  justify-content: center;
  background-color: $secondary;
}

.footer__container {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Bitter', serif;

  @media screen and (max-width: 840px) {
    flex-direction: column;
    text-align: center;

    .logo {
      margin: 20px 0;
    }
  }
}

.logo {
  margin: 0 20px;
}

.info {
  position: absolute;
  bottom: 20px;
}
</style>