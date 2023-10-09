import { shallowMount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';

import useToDoListStore from '@/stores/toDoListStore';
import ToDoList from '../ToDoList.vue';

describe('ToDoList', () => {
  const createWrapper = () => {
    return shallowMount(ToDoList, {
      global: {
        plugins: [createTestingPinia()],
      },
    });
  };

  it('should render the correct ToDoItem', () => {
    const wrapper = createWrapper();
    const store = useToDoListStore();

    expect(wrapper.findAll('to-do-item-stub').length).toBe(
      store.toDoList.length
    );
  });
});
