import { createPinia, setActivePinia } from 'pinia';

import useToDoListStore, { createInitState } from '../toDoListStore';

describe('useToDoListStore', () => {
  const initState = createInitState();

  beforeEach(() => {
    setActivePinia(createPinia());
  });

  describe('addToDo', () => {
    it('should do nothing if text is empty string', () => {
      const store = useToDoListStore();

      expect(store.toDoList).toEqual(initState);

      store.addToDo(' ');

      expect(store.toDoList).toEqual(initState);
    });

    it('should add a new todo', () => {
      const store = useToDoListStore();

      expect(store.toDoList).toEqual(initState);

      store.addToDo(' test ');

      expect(store.toDoList).toEqual(
        initState.concat({ id: '3', text: 'test', isFinished: false })
      );
    });
  });

  describe('editToDo', () => {
    it('should do nothing if text is empty string', () => {
      const store = useToDoListStore();

      expect(store.toDoList).toEqual(initState);

      store.editToDo('0', ' ');

      expect(store.toDoList).toEqual(initState);
    });

    it('should do nothing if the id is not found', () => {
      const store = useToDoListStore();

      expect(store.toDoList).toEqual(initState);

      store.editToDo('999', 'test text');

      expect(store.toDoList).toEqual(initState);
    });

    it('should edit the text', () => {
      const store = useToDoListStore();

      expect(store.toDoList).toEqual(initState);

      store.editToDo('0', ' test ');

      expect(store.toDoList[0]).toEqual({ ...initState[0], text: 'test' });
    });
  });

  describe('deleteToDo', () => {
    it('should do nothing if the id is not found', () => {
      const store = useToDoListStore();

      expect(store.toDoList).toEqual(initState);

      store.deleteToDo('999');

      expect(store.toDoList).toEqual(initState);
    });

    it('should delete the todo', () => {
      const store = useToDoListStore();

      expect(store.toDoList).toEqual(initState);

      store.deleteToDo('0');

      expect(store.toDoList.length).toBe(2);
      expect(store.toDoList).toEqual([
        { id: '1', text: 'b', isFinished: true },
        { id: '2', text: 'c', isFinished: false },
      ]);
    });
  });

  describe('toggleFinished', () => {
    it('should do nothing if the id is not found', () => {
      const store = useToDoListStore();

      expect(store.toDoList).toEqual(initState);

      store.toggleFinished('999');

      expect(store.toDoList).toEqual(initState);
    });

    it('should toggle the finished attr', () => {
      const store = useToDoListStore();

      expect(store.toDoList).toEqual(initState);

      store.toggleFinished('0');

      expect(store.toDoList[0]).toEqual({ ...initState[0], isFinished: true });
    });
  });
});
