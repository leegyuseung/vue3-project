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
  <Toast v-if="showToast" :message="toastMessage" :type="toastAlertType" />
</template>

<script>
import Toast from "@/components/ToastVue.vue";
import { useToast } from "@/composables/toast";

export default {
  components: {
    Toast,
  },
  setup() {
    const { toastMessage, toastAlertType, showToast, triggerToast } =
      useToast();
    return { toastMessage, toastAlertType, showToast, triggerToast };
  },
};
</script>

<style></style>
