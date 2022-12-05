<template>
  <form @submit.prevent="onSubmit">
    <div class="d-flex">
      <div class="flex-grow-1 mr-2">
        <input
          class="form-control"
          type="text"
          v-model="todo"
          placeholder="Type new to-do"
        />
      </div>
      <div>
        <button type="submit" class="btn btn-primary">Add</button>
      </div>
    </div>
    <div v-show="hasError" style="color: red">This field cannot be empty</div>
  </form>
</template>

<script>
import { ref } from "vue";

export default {
  setup(props, context) {
    const todo = ref("");
    const hasError = ref(false);

    const onSubmit = () => {
      if (todo.value === "") {
        hasError.value = true;
      } else {
        context.emit("add-todo", {
          id: Date.now(),
          subject: todo.value,
          completed: false,
        });
        todo.value = "";
        hasError.value = false;
      }
    };

    return { todo, hasError, onSubmit };
  },
};
</script>

<style></style>
