<template>
  <div v-if="loading">loading...</div>
  <form v-else @submit.prevent="onSave">
    <div class="row">
      <div class="col-6">
        <!-- <div class="form-group">
          <label>Subject</label>
          <input v-model="todo.subject" type="text" class="form-control" />
          <div v-if="subjectError" class="text-red">{{ subjectError }}</div>
        </div> -->
        <Input
          label="Subject"
          v-model:subject="todo.subject"
          :error="subjectError"
        />
      </div>
      <div v-if="editing" class="col-6">
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
      <div class="col-12">
        <div class="form-group">
          <label>Body</label>
          <textarea
            v-model="todo.body"
            class="form-control"
            id=""
            cols="30"
            rows="10"
          ></textarea>
        </div>
      </div>
    </div>

    <button type="submit" class="btn btn-primary" :disabled="!todoUpdated">
      {{ editing ? "Update" : "Create" }}
    </button>
    <button class="btn btn-outline-dark ml-2" @click="moveToTodolistPage">
      Cancel
    </button>
  </form>
</template>

<script>
import { useRoute, useRouter } from "vue-router";
import axios from "@/axios";
import { ref, computed, onUpdated } from "vue";
import _ from "lodash";
import { useToast } from "@/composables/toast";
import Input from "@/components/InputVue.vue";
export default {
  components: { Input },
  props: {
    editing: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const route = useRoute();
    const todo = ref({
      subject: "",
      completed: false,
      body: "",
    });
    onUpdated(() => {
      console.log(todo.value.subject);
    });

    const orginalTodo = ref(null);
    const loading = ref(false);
    const router = useRouter();
    const subjectError = ref("");

    const { toastMessage, toastAlertType, showToast, triggerToast } =
      useToast();

    const getTodo = async () => {
      loading.value = true;
      try {
        const res = await axios.get("todos/" + route.params.id);
        todo.value = { ...res.data };
        orginalTodo.value = { ...res.data };

        loading.value = false;
      } catch (error) {
        loading.value = false;
        console.log(error);
        triggerToast("Something went wrong", "danger");
      }
    };

    const todoUpdated = computed(() => {
      return !_.isEqual(todo.value, orginalTodo.value);
    });

    const toggleTodoStatus = () => {
      todo.value.completed = !todo.value.completed;
    };

    const moveToTodolistPage = () => {
      router.push({
        name: "Todos",
      });
    };

    if (props.editing) {
      getTodo();
    }

    const onSave = async () => {
      subjectError.value = "";
      if (!todo.value.subject) {
        subjectError.value = "Subject is required";
        return;
      }

      try {
        let res;
        const data = {
          subject: todo.value.subject,
          completed: todo.value.completed,
          body: todo.value.body,
        };
        if (props.editing) {
          res = await axios.put("todos/" + route.params.id, data);
        } else {
          res = await axios.post("todos", data);
          todo.value.subject = "";
          todo.value.body = "";
        }

        orginalTodo.value = { ...res.data };
        const message =
          "Successfully" + (props.editing ? "Updated!" : "Created!");
        triggerToast(message);

        if (!props.editing) {
          router.push({
            name: "Todos",
          });
        }
      } catch (error) {
        console.log(error);
        triggerToast("Something went wrong", "danger");
      }
    };
    return {
      todo,
      loading,
      toggleTodoStatus,
      moveToTodolistPage,
      onSave,
      todoUpdated,
      toastMessage,
      showToast,
      toastAlertType,
      subjectError,
    };
  },
};
</script>

<style scoped></style>
