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
  'list-item-text': true,
  'list-item-text__is-finished': item.value.isFinished,
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
  <div class="list-item" @click.self="onItemClick">
    <input
      ref="inputRef"
      type="text"
      class="edit-input"
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

<style scoped>
.list-item {
  padding: 4px 8px;
  margin: 8px 0;
  display: flex;
  align-items: center;
  background-color: #f5f5f5;
  border-radius: 3px;
  cursor: pointer;
}

.edit-input {
  flex: 1;
  height: 24px;
  margin: 16px 0;
}

.list-item-text {
  flex: 1;
  text-align: left;
  text-decoration: none;
  opacity: 1;
}

.list-item-text__is-finished {
  text-decoration: line-through;
  opacity: 0.4;
}
</style>
