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
  <transition name="slide">
    <Toast v-if="showToast" :message="toastMessage" :type="toastAlertType" />
  </transition>
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

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.5s ease;
}

.slide-enter-from,
.slide-leave-from {
  opacity: 0;
  transform: translateY(-30px);
}

.slide-enter-to,
.slide-leave-from {
  opacity: 1;
  transform: translateY(0px);
}
</style>
