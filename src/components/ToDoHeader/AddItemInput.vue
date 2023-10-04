<script setup lang="ts">
function handleSubmitValue() {}
</script>

<template>
  <div class="add-item-input-box">
    <input type="text" class="input" />
    <button class="add-item-btn" @click="handleSubmitValue">ADD</button>
  </div>
</template>

<style scoped>
.add-item-input-box {
  display: flex;
  justify-content: center;
  align-items: center;
}

.input {
  flex: 1;
  height: 40px;
}

.add-item-btn {
  margin-left: 8px;
}
</style>
