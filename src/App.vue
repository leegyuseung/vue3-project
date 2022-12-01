<template>
  <div class="name">{{ name }}</div>
  <button v-on:click="updateName" class="btn btn-primary">Click</button>
</template>

<script>
import { reactive } from "vue";

export default {
  setup() {
    const name = reactive({ id: 1 });
    // const greeting = (name) => {
    //   return "Hello," + name;
    // };

    // const greet = greeting(name);

    const updateName = () => {
      name.id = 2;
      console.log(name);
    };

    return { name, updateName };
  },
};
</script>

<style>
.name {
  color: red;
}
</style>
