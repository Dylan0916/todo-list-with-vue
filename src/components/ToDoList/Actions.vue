<script setup lang="ts">
import { toRefs } from 'vue';

import { Item } from '@/types/toDoList';

interface Props {
  id: Item['id'];
  isFinished: Item['isFinished'];
  // isEditing: boolean;
  onEidButtonClick: () => void;
}

const props = defineProps<Props>();
const { id, isFinished, onEidButtonClick } = toRefs(props);
</script>

<template>
  <div class="actions-wrapper">
    <input type="checkbox" :checked="isFinished" />
    <button class="eid-button" @click="onEidButtonClick">EDIT</button>
    <button class="delete-button">DELETE</button>
  </div>
</template>

<style scoped>
.actions-wrapper {
  display: flex;
  align-items: center;
}

.eid-button {
  margin: 0 8px;
}
</style>
