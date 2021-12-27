import { atom } from "recoil";

export const setLocal = (item: IBoard) =>
  localStorage.setItem("ToDos", JSON.stringify(item));

export const getLocal = (): IBoard | null => {
  const board = localStorage.getItem("ToDos");
  if (board) return JSON.parse(board);
  return null;
};

interface IBoard {
  [key: string]: IToDo[];
}

export interface IToDo {
  id: number;
  text: string;
}

interface IToDoState {
  [key: string]: IToDo[];
}
export const toDoState = atom<IToDoState>({
  key: "toDo",
  default: getLocal() ?? {},
});
