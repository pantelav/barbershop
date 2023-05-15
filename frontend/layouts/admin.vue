<template>
  <div class="admin__grid">
    <header class="admin__header px-5">
      <div class="empty"></div>
      <Button icon="pi pi-bars" outlined class="btn-menu" @click="sidebar = true" />
      <p class="hidden sm:block">Admin</p>
      <Button icon="pi pi-sign-out" label="Выход" iconPos="right" @click="logout" />
    </header>
    <aside class="admin__aside">
      <AdminNav />
    </aside>
    <main class="admin__content">
      <NuxtPage />
    </main>
    <Sidebar v-model:visible="sidebar">
      <AdminNav @close="sidebar = false"/>
    </Sidebar>
  </div>
</template>

<script setup lang='ts'>
import { endpoints } from '~/constants/endpoints';

const sidebar = ref(false)
const router = useRouter()

async function logout () {
  localStorage.removeItem('access_token')
  await useApiFetch(endpoints.admin.logout)
  router.push('/admin/login')
}
</script>

<style scoped lang='scss'>
.admin__grid {
  display: grid;
  grid-template-columns: 300px 1fr;
  grid-template-rows: 60px 1fr;
  min-height: 100vh;

  @media screen and (max-width: 900px) {
    grid-template-columns: 1fr;
  }
}

.admin__header {
  grid-area: 1 / 1 / 2 / 3;
  background-color: $secondary;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid #fff;
}

.admin__aside {
  grid-area: 2 / 1 / 3 / 2;
  padding: 20px 0 0 50px;
  background-color: $secondary;
  transition: color .2s;

  @media screen and (max-width: 900px) {
    display: none;
  }
}

.admin__content {
  grid-area: 2 / 2 / 3 / 3;
  display: flex;
  justify-content: center;

  @media screen and (max-width: 900px) {
    grid-area: 2 / 1 / 3 / 3;
  }
}

.empty {
  @media screen and (max-width: 900px) {
    display: none;
  }
}

.btn-menu {
  display: none;

  @media screen and (max-width: 900px) {
    display: block;
  }
}
</style>