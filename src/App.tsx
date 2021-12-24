import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { toDoState } from "./atoms";
import Board from "./Components/Board";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
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
  position: absolute;
  right: 200px;
  top: 100px;
  align-items: center;
`;

const Area = styled.div`
  width: 150px;
  height: 100px;
  background-color: whitesmoke;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 25px;
  span {
    font-size: 25px;
  }
`;

function App() {
  const { register, setValue, handleSubmit } = useForm<IForm>();
  const [toDos, setToDos] = useRecoilState(toDoState);
  const onDragEnd = (info: DropResult) => {
    const { destination, source } = info;
    if (!destination) return console.log("!destination");
    if (destination.droppableId === "deleteCard") {
      setToDos((allBoards) => {
        const boardCopy = [...allBoards[source.droppableId]];
        boardCopy.splice(source.index, 1);
        console.log("1111");
        return {
          ...allBoards,
          [source.droppableId]: boardCopy,
        };
      });
    }
    if (destination?.droppableId === source.droppableId) {
      setToDos((allBoards) => {
        const boardCopy = [...allBoards[source.droppableId]];
        const taskObj = boardCopy[source.index];
        boardCopy.splice(source.index, 1);
        boardCopy.splice(destination?.index, 0, taskObj);
        return {
          ...allBoards,
          [source.droppableId]: boardCopy,
        };
      });
    }
    if (
      destination?.droppableId !== "deleteCard" &&
      destination?.droppableId !== source.droppableId
    ) {
      setToDos((allBoards) => {
        const sourceCopy = [...allBoards[source.droppableId]];
        const taskObj = sourceCopy[source.index];
        const destinationCopy = [...allBoards[destination.droppableId]];
        console.log(sourceCopy);
        console.log(destinationCopy);
        console.log(allBoards);
        sourceCopy.splice(source.index, 1);
        destinationCopy.splice(destination?.index, 0, taskObj);
        return {
          ...allBoards,
          [source.droppableId]: sourceCopy,
          [destination.droppableId]: destinationCopy,
        };
      });
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
        [boardName]: [],
      };
    });
    setValue("boardName", "");
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <DeleteCard>
        <Droppable droppableId={"deleteCard"}>
          {(magic, info) => (
            <Area ref={magic.innerRef} {...magic.droppableProps}>
              <span>Delete Card</span>
            </Area>
          )}
        </Droppable>
      </DeleteCard>
      <Wrapper>
        <Form onSubmit={handleSubmit(onValid)}>
          <input
            {...register("boardName", { required: true })}
            type="text"
            placeholder="Put in board name"
          />
        </Form>
        <Boards>
          {Object.keys(toDos).map((boardId) => (
            <Board boardId={boardId} key={boardId} toDos={toDos[boardId]} />
          ))}
        </Boards>
      </Wrapper>
    </DragDropContext>
  );
}

export default App;
