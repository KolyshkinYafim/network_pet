import ErrorMessage from "@/app/components/error-message";
import {
  useCreatePostMutation,
  useLazyGetAllPostsQuery,
} from "@/app/services/postAPI";
import { Button, Textarea } from "@nextui-org/react";
import { Controller, useForm } from "react-hook-form";
import { IoMdCreate } from "react-icons/io";

const CreatePost = () => {
  const [createPost] = useCreatePostMutation();
  const [triggerAllPosts] = useLazyGetAllPostsQuery();

  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm();

  const err = errors?.post?.message as string;

  const handleFormSubmit = handleSubmit(async data => {
    try {
      await createPost({ content: data.createPost }).unwrap();
      setValue("createPost", "");
      await triggerAllPosts().unwrap();
    } catch (err) {
      console.log(err);
    }
  });

  return (
    <form className="flex-grow" onSubmit={handleFormSubmit}>
      <Controller
        name="createPost"
        control={control}
        defaultValue={""}
        rules={{ required: "Mandatory field" }}
        render={({ field }) => {
          return (
            <Textarea
              {...field}
              labelPlacement="outside"
              placeholder="About what you thinking?"
              className="mb-5"
            />
          );
        }}
      />
      {err && <ErrorMessage error={err} />}
      <Button
        color="success"
        className="flex-end"
        endContent={<IoMdCreate />}
        type="submit"
      >
        Submit
      </Button>
    </form>
  );
};

export default CreatePost;
