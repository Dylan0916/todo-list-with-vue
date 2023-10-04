<script setup lang="ts">
import ToDoHeader from '../ToDoHeader';
import ToDoList from '../ToDoList';
</script>

<template>
  <div class="card">
    <ToDoHeader />
    <ToDoList />
  </div>
</template>

<style scoped>
.card {
  width: 100%;
  max-width: 1024px;
  margin: auto;
}
</style>
