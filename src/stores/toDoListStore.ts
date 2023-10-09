import { ref } from 'vue';
import { defineStore } from 'pinia';

export const createInitState = () => [
  { id: '0', text: 'a', isFinished: false },
  { id: '1', text: 'b', isFinished: true },
  { id: '2', text: 'c', isFinished: false },
];

const useToDoListStore = defineStore('toDoList', () => {
  const toDoList = ref(createInitState());
  const uniqueId = ref(toDoList.value.length);

  const addToDo = (text: string) => {
    const trimmedText = text.trim();

    if (!trimmedText) return;

    const newToDo = {
      id: `${uniqueId.value++}`,
      text: trimmedText,
      isFinished: false,
    };

    toDoList.value.push(newToDo);
  };

  const editToDo = (id: string, text: string) => {
    const trimmedText = text.trim();

    if (!trimmedText) return;

    const foundToDo = toDoList.value.find((item) => item.id === id);

    if (!foundToDo) return;

    foundToDo.text = trimmedText;
  };

  const deleteToDo = (id: string) => {
    toDoList.value = toDoList.value.filter((item) => item.id !== id);
  };

  const toggleFinished = (id: string) => {
    const foundToDo = toDoList.value.find((item) => item.id === id);

    if (!foundToDo) return;

    foundToDo.isFinished = !foundToDo.isFinished;
  };

  return { toDoList, addToDo, editToDo, deleteToDo, toggleFinished };
});

// const useToDoListStore = defineStore('toDoList', {
//   state: () => ({ toDoList: initState }),
//   actions: {
//     addToDo(text: string) {
//       const trimmedText = text.trim();

//       if (!trimmedText) return;

//       const newToDo = {
//         id: `${uniqueId++}`,
//         text: trimmedText,
//         isFinished: false,
//       };

//       this.toDoList.push(newToDo);
//     },
//     editToDo(id: string, text: string) {
//       const trimmedText = text.trim();

//       if (!trimmedText) return;

//       const foundToDo = this.toDoList.find((item) => item.id === id);

//       if (!foundToDo) return;

//       foundToDo.text = trimmedText;
//     },
//     deleteToDo(id: string) {
//       this.toDoList = this.toDoList.filter((item) => item.id !== id);
//     },
//     toggleFinished(id: string) {
//       const foundToDo = this.toDoList.find((item) => item.id === id);

//       if (!foundToDo) return;

//       foundToDo.isFinished = !foundToDo.isFinished;
//     },
//   },
// });

export default useToDoListStore;
