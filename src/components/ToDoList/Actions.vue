<script setup lang="ts">
import { toRefs } from 'vue';

import { Item } from '@/types/toDoList';
import useToDoListStore from '@/stores/toDoListStore';

const toDoListStore = useToDoListStore();

interface Props {
  id: Item['id'];
  isFinished: Item['isFinished'];
  isEditing: boolean;
  onEidButtonClick: () => void;
}

const props = defineProps<Props>();
const { id, isFinished, onEidButtonClick } = toRefs(props);
</script>

<template>
  <div class="flex items-center ml-4">
    <input
      type="checkbox"
      :checked="isFinished"
      :disabled="isEditing"
      @click="toDoListStore.toggleFinished(id)"
    />
    <button class="btn mx-2" @click="onEidButtonClick" :disabled="isFinished">
      EDIT
    </button>
    <button class="delete-button btn" @click="toDoListStore.deleteToDo(id)">
      DELETE
    </button>
  </div>
</template>

<style scoped></style>
