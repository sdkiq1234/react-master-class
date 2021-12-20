import { useRecoilState, useRecoilValue } from "recoil";
import { Categories, categoryState, newCategory } from "../atoms";

// setToDos((oldToDos) => {
//     const newToDos = [{ text: toDo, id: Date.now(), category }, ...oldToDos];
//     localStorage.setItem("ToDos", JSON.stringify(newToDos));
//     return newToDos;
//   });
function SelectToDo() {
  const [category, setCategory] = useRecoilState(categoryState);
  const customCategory = useRecoilValue(newCategory);
  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value as any);
  };
  return (
    <select value={category} onInput={onInput}>
      <option value={Categories.TO_DO}>To Do</option>
      <option value={Categories.DOING}>Doing</option>
      <option value={Categories.DONE}>Done</option>
      {customCategory.map((category) => (
        <option key={category.id} value={category.title}>
          {category.title}
        </option>
      ))}
    </select>
  );
}

export default SelectToDo;
