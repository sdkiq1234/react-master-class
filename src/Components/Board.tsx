import styled from "styled-components";
import { Draggable, Droppable } from "react-beautiful-dnd";
import DraggableCard from "./DraggableCard";

import { IToDo, toDoState } from "../atoms";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import React from "react";

const BoardWrapper = styled.div`
  width: 300px;
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 5px;
  padding: 20px 10px;
  padding-top: 10px;
  min-height: 300px;
  max-height: 60vh;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h2`
  text-align: center;
  font-weight: 600;
  margin-bottom: 10px;
  font-size: 18px;
`;

interface IBoardProps {
  toDos: IToDo[];
  boardId: string;
  index: number;
}

interface IAreaProps {
  isDraggingFromThis: boolean;
  isDraggingOver: boolean;
}

const Area = styled.div<IAreaProps>`
  background-color: ${(props) =>
    props.isDraggingOver
      ? "#dfe6e9"
      : props.isDraggingFromThis
      ? "#b2bec3"
      : "transparent"};
  flex-grow: 1;
  transition: background-color 0.3s ease-in-out;
  padding: 20px;
  overflow: auto;
`;

const Form = styled.form`
  width: 100%;
  input {
    width: 100%;
  }
`;

interface IForm {
  toDo: string;
}

function Board({ toDos, boardId, index }: IBoardProps) {
  const setToDos = useSetRecoilState(toDoState);
  const { register, setValue, handleSubmit } = useForm<IForm>();
  const onValid = ({ toDo }: IForm) => {
    const newToDo = {
      id: Date.now(),
      text: toDo,
    };
    setToDos((allBoards) => {
      const newBoard = {
        ...allBoards,
        [boardId]: [newToDo, ...allBoards[boardId]],
      };
      localStorage.setItem("ToDos", JSON.stringify(newBoard) as any);
      return newBoard;
    });
    setValue("toDo", "");
  };

  return (
    <Draggable key={boardId} draggableId={boardId} index={index}>
      {(dragMagic, info) => (
        <BoardWrapper ref={dragMagic.innerRef} {...dragMagic.draggableProps}>
          <Title ref={dragMagic.innerRef} {...dragMagic.dragHandleProps}>
            {boardId.slice(0, -1)}
          </Title>
          <Form onSubmit={handleSubmit(onValid)}>
            <input
              {...register("toDo", { required: true })}
              type="text"
              placeholder={`Add task on ${boardId}`}
            />
          </Form>
          <Droppable droppableId={boardId} type="card">
            {(magic, info) => (
              <Area
                isDraggingOver={info.isDraggingOver}
                isDraggingFromThis={Boolean(info.draggingFromThisWith)}
                ref={magic.innerRef}
                {...magic.droppableProps}
              >
                {toDos.map((toDo, index) => (
                  <DraggableCard
                    toDoId={toDo.id}
                    key={toDo.id}
                    index={index}
                    toDoText={toDo.text}
                  />
                ))}
                {magic.placeholder}
              </Area>
            )}
          </Droppable>
        </BoardWrapper>
      )}
    </Draggable>
  );
}

export default React.memo(Board);
