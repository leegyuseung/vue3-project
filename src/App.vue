<template>
  <Navbar />
  <div class="container">
    <router-view />
  </div>
  <Toast />
</template>

<script>
import Toast from "@/components/ToastVue.vue";
import Navbar from "@/components/NavbarVue.vue";
export default {
  components: {
    Toast,
    Navbar,
  },
};
</script>

<style scoped></style>
