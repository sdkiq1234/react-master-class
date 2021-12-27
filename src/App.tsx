import { useEffect } from "react";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { setLocal, toDoState } from "./atoms";
import Board from "./Components/Board";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const Boards = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 10px;
  width: 100%;
`;

const Form = styled.form`
  margin-bottom: 30px;
  display: flex;
  justify-content: center;
  input {
    width: 300px;
    height: 100px;
    background-color: whitesmoke;
    border-radius: 25px;
    text-align: center;
    font-size: 25px;
  }
`;

interface IForm {
  boardName: string;
}

const DeleteCard = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
`;

const Area = styled.div`
  width: 150px;
  height: 100px;
`;

const FormWrapper = styled.div`
  width: 100vw;
  display: grid;
  grid-template-columns: repeat(3, 1fr);

  /* :nth-child(1) {
    grid-column: 2/3;
    grid-row: 1/2;
  }
  :nth-child(2) {
    grid-column: 3/4;
    grid-row: 1/2;
  } */
`;

function App() {
  const { register, setValue, handleSubmit } = useForm<IForm>();
  const [toDos, setToDos] = useRecoilState(toDoState);
  const onDragEnd = (info: DropResult) => {
    const { destination, source, type } = info;
    if (!destination || !source) return;
    if (destination.droppableId === "deleteCard") {
      setToDos((allBoards) => {
        const boardCopy = [...allBoards[source.droppableId]];
        boardCopy.splice(source.index, 1);
        return {
          ...allBoards,
          [source.droppableId]: boardCopy,
        };
      });
      return;
    }
    if (destination.droppableId === "deleteBoard") {
      setToDos((allBoards) => {
        const boardCopy = { ...allBoards };
        delete boardCopy[info.draggableId];
        return boardCopy;
      });
      return;
    }
    if (type === "board") {
      setToDos((allBoards) => {
        const boardCopy = Object.entries(allBoards);
        const [temp] = boardCopy.splice(source.index, 1);
        boardCopy.splice(destination.index, 0, temp);
        const key = Object.fromEntries(boardCopy);
        console.log(boardCopy);
        console.log(key);
        return key;
      });
      return;
    } else if (type === "card") {
      if (destination?.droppableId === source.droppableId) {
        setToDos((allBoards) => {
          const boardCopy = [...allBoards[source.droppableId]];
          const taskObj = boardCopy[source.index];
          boardCopy.splice(source.index, 1);
          boardCopy.splice(destination?.index, 0, taskObj);
          return { ...allBoards, [source.droppableId]: boardCopy };
        });
        return;
      }
      if (destination?.droppableId !== source.droppableId) {
        setToDos((allBoards) => {
          const sourceCopy = [...allBoards[source.droppableId]];
          const taskObj = sourceCopy[source.index];
          const destinationCopy = [...allBoards[destination.droppableId]];
          sourceCopy.splice(source.index, 1);
          destinationCopy.splice(destination?.index, 0, taskObj);
          return {
            ...allBoards,
            [source.droppableId]: sourceCopy,
            [destination.droppableId]: destinationCopy,
          };
        });
        return;
      }
    }

    // setToDos((oldToDos) => {
    //   const toDosCopy = [...oldToDos];
    //   toDosCopy.splice(source.index, 1);
    //   toDosCopy.splice(destination?.index, 0, draggableId);
    //   return toDosCopy;
    // });
  };
  const onValid = ({ boardName }: IForm) => {
    setToDos((allBoards) => {
      if (allBoards[boardName]) {
        return allBoards;
      }
      return {
        ...allBoards,
        [boardName + "."]: [],
      };
    });
    setValue("boardName", "");
  };
  useEffect(() => {
    setLocal(toDos);
  }, [toDos]);
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        <FormWrapper>
          <div></div>
          <Form onSubmit={handleSubmit(onValid)}>
            <input
              {...register("boardName", { required: true })}
              type="text"
              placeholder="Put in board name"
            />
          </Form>
          <DeleteCard>
            <Droppable droppableId="deleteCard" type="card">
              {(magic, info) => (
                <Area ref={magic.innerRef} {...magic.droppableProps}>
                  {magic.placeholder}
                </Area>
              )}
            </Droppable>
            Delete Card
            <Droppable droppableId="deleteBoard" type="board">
              {(magic, info) => (
                <Area ref={magic.innerRef} {...magic.droppableProps}>
                  {magic.placeholder}
                </Area>
              )}
            </Droppable>
          </DeleteCard>
        </FormWrapper>
        <Droppable droppableId="boards" type="board" direction="horizontal">
          {(magic, info) => (
            <Boards ref={magic.innerRef} {...magic.droppableProps}>
              {Object.keys(toDos).map((boardId, index) => (
                <Board
                  boardId={boardId}
                  key={boardId}
                  toDos={toDos[boardId]}
                  index={index}
                />
              ))}
              {magic.placeholder}
            </Boards>
          )}
        </Droppable>
      </Wrapper>
    </DragDropContext>
  );
}

export default App;
