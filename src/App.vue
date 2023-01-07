<template>
  <nav class="navbar navbar-expand-lg bg-light">
    <div class="container-fluid">
      <router-link class="navbar-brand" :to="{ name: 'Home' }"
        >Test Code</router-link
      >
      <ul class="navbar-nav">
        <li class="nav-item">
          <router-link class="nav-link" :to="{ name: 'Todos' }"
            >Todos</router-link
          >
        </li>
      </ul>
    </div>
  </nav>
  <div class="container">
    <router-view />
  </div>
  <Toast />
</template>

<script>
import Toast from "@/components/ToastVue.vue";

export default {
  components: {
    Toast,
  },
};
</script>

<style scoped></style>
