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
const isEditing = ref(false);
const text = ref(item.value.text);
const listItemTextClass = computed(() => ({
  'list-item-text': true,
  'list-item-text__is-finished': item.value.isFinished,
}));

function handleEdit() {
  if (isEditing.value) {
    toDoListStore.editToDo(item.value.id, text.value);
  }
  isEditing.value = !isEditing.value;
}
</script>

<template>
  <div class="list-item">
    <input class="edit-input" type="text" v-model="text" v-show="isEditing" />
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
