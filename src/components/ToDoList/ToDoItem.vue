<script setup lang="ts">
import { toRefs, computed } from 'vue';

import Actions from './Actions.vue';
import { Item } from '@/types/toDoList';

interface Props {
  item: Item;
}

const props = defineProps<Props>();
const { item } = toRefs(props);
const listItemTextClass = computed(() => ({
  'list-item-text': true,
  'list-item-text__is-finished': item.value.isFinished,
}));

function handleEdit() {
  console.log(item);
}
</script>

<template>
  <div class="list-item">
    <p :class="listItemTextClass">{{ item.text }}</p>
    <Actions
      :id="item.id"
      :isFinished="item.isFinished"
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
