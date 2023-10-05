<script setup lang="ts">
import ToDoItem from './ToDoItem.vue';

import useToDoListStore from '@/stores/toDoListStore';

const toDoListStore = useToDoListStore();
</script>

<template>
  <div class="card-content">
    <p class="to-do-list-header">LIST OF WORKS TODO:</p>
    <div class="list">
      <ToDoItem
        v-for="item in toDoListStore.toDoList"
        :key="item.id"
        :item="item"
      />
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
