import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { newCategory } from "../atoms";

interface IForm {
  category: string;
}

function CreateCategory() {
  const setCategory = useSetRecoilState(newCategory);
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const handleValid = ({ category }: IForm) => {
    setCategory((oldCategory) => {
      const newCategory = [{ title: category, id: Date.now() }, ...oldCategory];
      localStorage.setItem("Categories", JSON.stringify(newCategory));
      return newCategory;
    });
    setValue("category", "");
  };
  return (
    <form onSubmit={handleSubmit(handleValid)}>
      <input
        {...register("category", { required: "Please write a new Category" })}
        placeholder="Write a new Category"
      />
      <button>Add</button>
    </form>
  );
}

export default CreateCategory;
