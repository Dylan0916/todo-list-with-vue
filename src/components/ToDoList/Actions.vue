<script setup lang="ts">
import { toRefs } from 'vue';

import { Item } from '@/types/toDoList';
import useToDoListStore from '@/stores/toDoListStore';

const toDoListStore = useToDoListStore();

interface Props {
  id: Item['id'];
  isFinished: Item['isFinished'];
  isEditing: boolean;
}

const props = defineProps<Props>();
const { id, isFinished } = toRefs(props);
</script>

<template>
  <div class="flex items-center ml-4">
    <input
      type="checkbox"
      :checked="isFinished"
      :disabled="isEditing"
      @click="toDoListStore.toggleFinished(id)"
      data-test="finished-checkbox"
    />
    <button
      class="btn mx-2"
      @click="$emit('onEidButtonClick')"
      :disabled="isFinished"
      data-test="edit-btn"
    >
      EDIT
    </button>
    <button
      class="delete-button btn"
      @click="toDoListStore.deleteToDo(id)"
      data-test="delete-btn"
    >
      DELETE
    </button>
  </div>
</template>

<style scoped></style>
