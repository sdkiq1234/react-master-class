import { atom, selector } from "recoil";

export enum Categories {
  "TO_DO" = "TO_DO",
  "DOING" = "DOING",
  "DONE" = "DONE",
}

export const categoryState = atom<IToDo["category"]>({
  key: "category",
  default: Categories.TO_DO,
});

export interface ICategory {
  title: string;
  id: number;
}

export interface IToDo {
  text: string;
  id: number;
  category: Categories;
}

const localToDos = JSON.parse(localStorage.getItem("ToDos") as any);
const localCategory = JSON.parse(localStorage.getItem("Categories") as any);

export const newCategory = atom<ICategory[]>({
  key: "newCategory",
  default: localCategory ? localCategory : [],
});

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
