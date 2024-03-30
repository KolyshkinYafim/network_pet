import ErrorMessage from "@/app/components/error-message";
import { useCreateCommentMutation } from "@/app/services/commentsAPI";
import { useLazyGetPostByIdQuery } from "@/app/services/postAPI";
import { Button, Textarea } from "@nextui-org/react";
import { Controller, useForm } from "react-hook-form";
import { IoMdCreate } from "react-icons/io";
import { useParams } from "react-router-dom";

const CreateComment = () => {
  const { id } = useParams<{ id: string }>();
  const [createComment] = useCreateCommentMutation();
  const [getCommentById] = useLazyGetPostByIdQuery();

  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm();

  const err = errors?.post?.message as string;

  const handleFormSubmit = handleSubmit(async data => {
    try {
      if (id) {
        await createComment({
          content: data.createComment,
          postId: id,
        }).unwrap();
        setValue("createComment", "");
        await getCommentById(id).unwrap();
      }
    } catch (err) {
      console.log(err);
    }
  });

  return (
    <form className="flex-grow" onSubmit={handleFormSubmit}>
      <Controller
        name="createComment"
        control={control}
        defaultValue={""}
        rules={{ required: "Mandatory field" }}
        render={({ field }) => {
          return (
            <Textarea
              {...field}
              labelPlacement="outside"
              placeholder="Write your comment"
              className="mb-5"
            />
          );
        }}
      />
      {err && <ErrorMessage error={err} />}
      <Button
        color="primary"
        className="flex-end"
        endContent={<IoMdCreate />}
        type="submit"
      >
        Reply
      </Button>
    </form>
  );
};

export default CreateComment;
