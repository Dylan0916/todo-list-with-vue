import { mount, type ComponentMountingOptions } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';

import useToDoListStore from '@/stores/toDoListStore';
import ToDoItem from '../ToDoItem.vue';

describe('ToDoItem', () => {
  const item = {
    id: '0',
    text: 'test',
    isFinished: false,
  };
  const defaultProps = {
    item,
  };

  const createWrapper = (
    opts: ComponentMountingOptions<typeof ToDoItem> = {}
  ) => {
    return mount(ToDoItem, {
      props: { ...defaultProps, ...opts.props },
      attachTo: document.body,
      global: {
        plugins: [createTestingPinia()],
        ...opts.global,
      },
    });
  };

  describe('item wrapper', () => {
    it('should toggle toggleFinished when the wrapper is clicked', async () => {
      const wrapper = createWrapper();
      const store = useToDoListStore();
      const itemWrapper = wrapper.get('[data-test="item-wrapper"]');

      expect(store.toggleFinished).not.toBeCalled();

      await itemWrapper.trigger('click');

      expect(store.toggleFinished).toBeCalledWith(defaultProps.item.id);
    });

    it('should not toggle toggleFinished when the wrapper is clicked if it is editing', async () => {
      const actionsTemplate = `
        <template>
          <button data-test="edit-btn" @click="$emit('onEidButtonClick')">EDIT</button>
        </template>
      `;
      const wrapper = createWrapper({
        global: { stubs: { Actions: { template: actionsTemplate } } },
      });
      const store = useToDoListStore();
      const itemWrapper = wrapper.get('[data-test="item-wrapper"]');
      const editBtn = wrapper.get('[data-test="edit-btn"]');

      expect(store.toggleFinished).not.toBeCalled();

      await editBtn.trigger('click');
      await itemWrapper.trigger('click');

      expect(store.toggleFinished).not.toBeCalled();
    });
  });

  describe('edit input and text', () => {
    it('should toggle render edit input and text if isEditing change', async () => {
      const actionsTemplate = `
        <template>
          <button data-test="edit-btn" @click="$emit('onEidButtonClick')">EDIT</button>
        </template>
      `;
      const wrapper = createWrapper({
        global: { stubs: { Actions: { template: actionsTemplate } } },
      });
      const editInput = wrapper.get('[data-test="edit-input"]');
      const itemText = wrapper.find('[data-test="item-text"]');
      const editBtn = wrapper.find('[data-test="edit-btn"]');

      expect(editInput.isVisible()).toBeFalsy();
      expect(itemText.isVisible()).toBeTruthy();

      await editBtn.trigger('click');

      expect(editInput.isVisible()).toBeTruthy();
      expect(itemText.isVisible()).toBeFalsy();
    });

    it('should render the correct text', () => {
      const wrapper = createWrapper();
      const itemText = wrapper.find('[data-test="item-text"]');

      expect(itemText.text()).toBe(item.text);
    });
  });
});
