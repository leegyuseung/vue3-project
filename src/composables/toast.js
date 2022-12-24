import { ref, onUnmounted } from "vue";
export const useToast = () => {
  const toastMessage = ref("");
  const toastAlertType = ref("");
  const showToast = ref(false);
  const timeout = ref(null);
  const triggerToast = (message, type = "success") => {
    toastMessage.value = message;
    toastAlertType.value = type;
    showToast.value = true;
    timeout.value = setTimeout(() => {
      toastMessage.value = "";
      showToast.value = false;
      toastAlertType.value = "";
    }, 3000);

    onUnmounted(() => {
      console.log("unmounted");
      clearTimeout(timeout.value);
    });
  };
  return {
    toastMessage,
    toastAlertType,
    showToast,
    triggerToast,
  };
};
