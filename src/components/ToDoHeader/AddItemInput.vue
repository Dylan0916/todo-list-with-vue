<script setup lang="ts">
import { ref } from 'vue';

import useToDoListStore from '@/stores/toDoListStore';

const toDoListStore = useToDoListStore();
const inputText = ref('');

function handleSubmitValue() {
  toDoListStore.addToDo(inputText.value);
  inputText.value = '';
}
</script>

<template>
  <div class="flex justify-center items-center">
    <input
      data-test="add-todo-input"
      type="text"
      class="input flex-1 h-8"
      v-model="inputText"
      @keypress.enter="handleSubmitValue"
    />
    <button class="ml-2 btn" @click="handleSubmitValue">ADD</button>
  </div>
</template>

<style scoped></style>
