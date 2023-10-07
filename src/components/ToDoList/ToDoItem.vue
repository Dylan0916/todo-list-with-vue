<script setup lang="ts">
import { ref, toRefs, computed } from 'vue';

import { Item } from '@/types/toDoList';
import useToDoListStore from '@/stores/toDoListStore';

import Actions from './Actions.vue';

const toDoListStore = useToDoListStore();

interface Props {
  item: Item;
}

const props = defineProps<Props>();
const { item } = toRefs(props);
const inputRef = ref(null);
const isEditing = ref(false);
const text = ref(item.value.text);
const listItemTextClass = computed(() => ({
  'flex-1': true,
  'text-left': true,
  'line-through': item.value.isFinished,
  'opacity-40': item.value.isFinished,
}));

function onItemClick() {
  if (!isEditing.value) {
    toDoListStore.toggleFinished(item.value.id);
  }
}

function handleEdit() {
  if (isEditing.value) {
    toDoListStore.editToDo(item.value.id, text.value);
  } else {
    // inputRef.value.focus();
  }
  isEditing.value = !isEditing.value;
}
</script>

<template>
  <div
    class="py-3 px-2 my-2 flex items-center bg-gray-100 rounded cursor-pointer"
    @click.self="onItemClick"
  >
    <input
      ref="inputRef"
      type="text"
      class="input flex-1 h-6"
      v-model="text"
      v-show="isEditing"
      @keypress.enter="handleEdit"
    />
    <p :class="listItemTextClass" v-show="!isEditing">{{ text }}</p>
    <Actions
      :id="item.id"
      :isFinished="item.isFinished"
      :isEditing="isEditing"
      :onEidButtonClick="handleEdit"
    />
  </div>
</template>

<style scoped></style>
