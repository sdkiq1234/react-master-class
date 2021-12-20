import React from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { Categories, IToDo, newCategory, toDoState } from "../atoms";

function ToDo({ text, category, id }: IToDo) {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const customCategory = useRecoilValue(newCategory);
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;
    setToDos((oldToDos) => {
      const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
      const newToDo = { text, id, category: name as any };
      console.log(toDos);
      const newToDos =
        name === "delete"
          ? [
              ...oldToDos.slice(0, targetIndex),
              ...oldToDos.slice(targetIndex + 1),
            ]
          : [
              ...oldToDos.slice(0, targetIndex),
              newToDo,
              ...oldToDos.slice(targetIndex + 1),
            ];
      localStorage.setItem("ToDos", JSON.stringify(newToDos));
      return newToDos;
    });
  };
  return (
    <li>
      <span>{text}</span>
      {category !== Categories.DOING && (
        <button name={Categories.DOING} onClick={onClick}>
          Doing
        </button>
      )}
      {category !== Categories.TO_DO && (
        <button name={Categories.TO_DO} onClick={onClick}>
          To Do
        </button>
      )}
      {category !== Categories.DONE && (
        <button name={Categories.DONE} onClick={onClick}>
          Done
        </button>
      )}
      {customCategory.map((custom) =>
        category !== custom.title ? (
          <button key={custom.id} name={custom.title} onClick={onClick}>
            {custom.title}
          </button>
        ) : null
      )}
      <button name="delete" onClick={onClick}>
        delete
      </button>
    </li>
  );
}

export default ToDo;
