<script setup lang="ts">
import ToDoItem from './ToDoItem.vue';

import useToDoListStore from '@/stores/toDoListStore';

const toDoListStore = useToDoListStore();
</script>

<template>
  <div class="border border-black p-4">
    <p class="text-center mb-4">LIST OF WORKS TODO:</p>
    <div>
      <ToDoItem
        v-for="item in toDoListStore.toDoList"
        :key="item.id"
        :item="item"
      />
    </div>
  </div>
</template>

<style scoped></style>
