import { mount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';

import useToDoListStore from '@/stores/toDoListStore';
import Actions from '../Actions.vue';

describe('Actions', () => {
  const defaultProps = {
    id: '0',
    isFinished: false,
    isEditing: false,
  };

  const createWrapper = (testProps = {}) => {
    return mount(Actions, {
      props: { ...defaultProps, ...testProps },
      global: {
        plugins: [createTestingPinia()],
      },
    });
  };

  describe('finished checkbox', () => {
    it('should call toggleFinished when the checkbox is clicked', async () => {
      const wrapper = createWrapper();
      const store = useToDoListStore();
      const finishedCheckbox = wrapper.get('[data-test="finished-checkbox"]');

      expect(store.toggleFinished).not.toBeCalled();

      await finishedCheckbox.trigger('click');

      expect(store.toggleFinished).toBeCalledWith(defaultProps.id);
    });

    it('should checked if props.isFinished is "true"', () => {
      const wrapper = createWrapper({ isFinished: true });
      const finishedCheckbox = wrapper.get('[data-test="finished-checkbox"]');

      expect(
        (finishedCheckbox.element as HTMLInputElement).checked
      ).toBeTruthy();
    });

    it('should not checked if props.isFinished is "true"', () => {
      const wrapper = createWrapper({ isFinished: false });
      const finishedCheckbox = wrapper.get('[data-test="finished-checkbox"]');

      expect(
        (finishedCheckbox.element as HTMLInputElement).checked
      ).toBeFalsy();
    });

    it('should disabled if props.isEditing is "true"', () => {
      const wrapper = createWrapper({ isEditing: true });
      const finishedCheckbox = wrapper.get('[data-test="finished-checkbox"]');

      expect(
        (finishedCheckbox.element as HTMLInputElement).disabled
      ).toBeTruthy();
    });

    it('should not disabled if props.isEditing is "false"', () => {
      const wrapper = createWrapper({ isEditing: false });
      const finishedCheckbox = wrapper.get('[data-test="finished-checkbox"]');

      expect(
        (finishedCheckbox.element as HTMLInputElement).disabled
      ).toBeFalsy();
    });
  });

  describe('edit btn', () => {
    it('should emit onEidButtonClick when the button is clicked', async () => {
      const wrapper = createWrapper();
      const editBtn = wrapper.get('[data-test="edit-btn"]');

      expect(wrapper.emitted()).not.toHaveProperty('onEidButtonClick');

      await editBtn.trigger('click');

      expect(wrapper.emitted()).toHaveProperty('onEidButtonClick');
    });

    it('should disabled if props.isFinished is "true"', () => {
      const wrapper = createWrapper({ isFinished: true });
      const editBtn = wrapper.get('[data-test="edit-btn"]');

      expect((editBtn.element as HTMLInputElement).disabled).toBeTruthy();
    });

    it('should not disabled if props.isFinished is "false"', () => {
      const wrapper = createWrapper({ isFinished: false });
      const editBtn = wrapper.get('[data-test="edit-btn"]');

      expect((editBtn.element as HTMLInputElement).disabled).toBeFalsy();
    });
  });

  describe('delete btn', () => {
    it('should call deleteToDo when the button is clicked', async () => {
      const wrapper = createWrapper();
      const store = useToDoListStore();
      const deleteBtn = wrapper.get('[data-test="delete-btn"]');

      expect(store.deleteToDo).not.toBeCalled();

      await deleteBtn.trigger('click');

      expect(store.deleteToDo).toBeCalledWith(defaultProps.id);
    });
  });
});
