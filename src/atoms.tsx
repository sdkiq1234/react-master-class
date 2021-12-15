import { atom, selector } from "recoil";

const localCategory = JSON.parse(localStorage.getItem("Category") as any);

export const allCategoryState = atom<IToDo["category"]>({
  key: "allCategory",
  default:
    localCategory?.length > 0 ? localCategory : ["TO_DO", "DOING", "DONE"],
});

export const Categories = allCategoryState;

export interface IToDo {
  text: string;
  id: number;
  category: string;
}

export const categoryState = atom<IToDo["category"]>({
  key: "category",
  default: "TO_DO",
});

const localToDos = JSON.parse(localStorage.getItem("ToDos") as any);

export const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: localToDos ? localToDos : [],
});

export const toDoSelector = selector({
  key: "toDoSelector",
  get: ({ get }) => {
    const toDos = get(toDoState);
    const category = get(categoryState);
    return toDos.filter((toDo) => toDo.category === category);
  },
});
