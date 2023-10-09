import { mount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';

import useToDoListStore from '@/stores/toDoListStore';
import AddItemInput from '../AddItemInput.vue';

describe('AddItemInput', () => {
  const createWrapper = () => {
    return mount(AddItemInput, {
      global: {
        plugins: [createTestingPinia()],
      },
    });
  };

  it('should add a todo to store when the ADD button is clicked', async () => {
    const wrapper = createWrapper();
    const store = useToDoListStore();
    const addToDoInput = wrapper.get('[data-test="add-todo-input"]');
    const addToDoInputField = addToDoInput.element as HTMLInputElement;
    const addToDoBtn = wrapper.get('.btn');

    expect(addToDoInputField.value).toBe('');

    await addToDoInput.setValue('test');

    expect(addToDoInputField.value).toBe('test');
    expect(store.addToDo).not.toBeCalled();

    await addToDoBtn.trigger('click');

    expect(store.addToDo).toBeCalledWith('test');
    expect(addToDoInputField.value).toBe('');
  });
});
