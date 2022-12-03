<template>
  <input type="text" v-model="name" />
  <button @click="onSubmit" class="btn btn-primary">Click</button>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    const name = ref("Kossie");

    const onSubmit = () => {
      console.log(name.value);
    };

    return { name, onSubmit };
  },
};
</script>

<style>
.name {
  color: red;
}
</style>
