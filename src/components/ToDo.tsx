import React from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { allCategoryState, IToDo, toDoState } from "../atoms";

function ToDo({ text, category, id }: IToDo) {
  const setToDos = useSetRecoilState(toDoState);
  const Categories = useRecoilValue(allCategoryState);
  console.log(Categories);
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;
    setToDos((oldToDos) => {
      const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
      const newToDo = { text, id, category: name as any };
      return [
        ...oldToDos.slice(0, targetIndex),
        newToDo,
        ...oldToDos.slice(targetIndex + 1),
      ];
    });
  };
  return (
    <li>
      <span>{text}</span>
      {category !== Categories[1] && (
        <button name={Categories[1]} onClick={onClick}>
          Doing
        </button>
      )}
      {category !== Categories[0] && (
        <button name={Categories[0]} onClick={onClick}>
          To Do
        </button>
      )}
      {category !== Categories[2] && (
        <button name={Categories[2]} onClick={onClick}>
          Done
        </button>
      )}
    </li>
  );
}

export default ToDo;
