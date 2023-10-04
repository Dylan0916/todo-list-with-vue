<script setup lang="ts">
import AddItemInput from './AddItemInput.vue';
</script>

<template>
  <div class="to-do-header-box">
    <h2>TODO LIST</h2>
    <AddItemInput />
  </div>
</template>

<style scoped>
.to-do-header-box {
  text-align: center;
  padding: 32px 72px 24px;
}
</style>
