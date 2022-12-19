<template>
  <h1>To-Do Page</h1>
  <div v-if="loading">loading...</div>
  <form v-else @submit.prevent="onSave">
    <div class="row">
      <div class="col-6">
        <div class="form-group">
          <label>Subject</label>
          <input v-model="todo.subject" type="text" class="form-control" />
        </div>
      </div>
      <div class="col-6">
        <div class="form-group">
          <label>Status</label>
          <div>
            <button
              class="btn"
              type="button"
              :class="todo.completed ? 'btn-success' : 'btn-danger'"
              @click="toggleTodoStatus"
            >
              {{ todo.completed ? "Completed" : "Incomplete" }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <button type="submit" class="btn btn-primary">Save</button>
    <button class="btn btn-outline-dark ml-2" @click="moveToTodolistPage">
      Cancel
    </button>
  </form>
</template>

<script>
import { useRoute, useRouter } from "vue-router";
import axios from "axios";
import { ref } from "vue";
export default {
  setup() {
    const route = useRoute();
    const todo = ref(null);
    const loading = ref(true);
    const router = useRouter();
    const getTodo = async () => {
      const res = await axios.get(
        "http://localhost:3000/todos/" + route.params.id
      );
      todo.value = res.data;
      loading.value = false;
    };
    const toggleTodoStatus = () => {
      todo.value.completed = !todo.value.completed;
    };

    const moveToTodolistPage = () => {
      router.push({
        name: "Todos",
      });
    };

    getTodo();

    const onSave = async () => {
      const res = await axios.put(
        "http://localhost:3000/todos/" + route.params.id,
        {
          subject: todo.value.subject,
          completed: todo.value.completed,
        }
      );
      console.log(res);
    };
    return { todo, loading, toggleTodoStatus, moveToTodolistPage, onSave };
  },
};
</script>

<style></style>
