<script setup lang="ts">
import ToDoItem from './ToDoItem.vue';

const toDoList = [
  { id: '0', text: 'a', isFinished: false },
  { id: '1', text: 'b', isFinished: true },
  { id: '2', text: 'c', isFinished: false },
];
</script>

<template>
  <div class="card-content">
    <p class="to-do-list-header">LIST OF WORKS TODO:</p>
    <div class="list">
      <ToDoItem v-for="item in toDoList" :key="item.id" :item="item" />
    </div>
  </div>
</template>

<style scoped>
.card-content {
  border: solid 1px;
  padding: 16px;
}

.to-do-list-header {
  text-align: center;
}
</style>
