import { useDeleteCommentMutation } from "@/app/services/commentsAPI";
import {
  useLikePostMutation,
  useUnlikePostMutation,
} from "@/app/services/likesAPI";
import {
  useDeletePostMutation,
  useLazyGetAllPostsQuery,
  useLazyGetPostByIdQuery,
} from "@/app/services/postAPI";
import { selectCurrentUser } from "@/app/store/slices/userSlice";
import { useTypedSelector } from "@/app/store/store";
import {
  CardBody,
  CardFooter,
  CardHeader,
  Card as NextCard,
  Spinner,
} from "@nextui-org/react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import User from "../user";
import { formatToClientDate } from "@/utils/format-to-client-date";
import { RiDeleteBinLine } from "react-icons/ri";
import Typography from "../typography";
import MetaInfo from "../meta-info";
import { FcDislike } from "react-icons/fc";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { FaRegComment } from "react-icons/fa";
import ErrorMessage from "../error-message";
import { hasErrorField } from "@/utils/has-error-field";

type Props = {
  id?: string;
  name: string;
  avatarUrl: string;
  authorId: string;
  content: string;
  commentId?: string;
  likesCount?: number;
  commentsCount?: number;
  createdAt?: Date;
  cardFor: "comment" | "post" | "current-post";
  likedByUser?: boolean;
};

const Card: React.FC<Props> = ({
  id = "",
  name = "",
  avatarUrl = "",
  authorId = "",
  commentId = "",
  content = "",
  createdAt,
  likesCount = 0,
  commentsCount = 0,
  cardFor = "post",
  likedByUser = false,
}) => {
  const [likePost] = useLikePostMutation();
  const [unlikePost] = useUnlikePostMutation();
  const [triggerGetAllPosts] = useLazyGetAllPostsQuery();
  const [triggerGetPostById] = useLazyGetPostByIdQuery();
  const [deletePost, deletePostStatus] = useDeletePostMutation();
  const [deleteComment, deleteCommentStatus] = useDeleteCommentMutation();
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const currentUser = useTypedSelector(selectCurrentUser);

  const refetchPosts = async () => {
    switch (cardFor) {
      case "post":
        await triggerGetAllPosts().unwrap();
        break;
      case "current-post":
        await triggerGetAllPosts().unwrap();
        break;
      case "comment":
        await triggerGetPostById(id).unwrap();
        break;
      default:
        throw new Error("wrong cardfor argument");
    }
  };

  const handleDelete = async () => {
    try {
      switch (cardFor) {
        case "post":
          await deletePost(id).unwrap();
          await refetchPosts();
          break;
        case "comment":
          await deleteComment(commentId).unwrap();
          await refetchPosts();
          break;
        case "current-post":
          await deletePost(id).unwrap();
          navigate("/");
          break;
        default:
          throw new Error("wrong cardfor argument");
      }
    } catch (error) {
      if (hasErrorField(error)) {
        setError(error.data.error);
      }

      setError(error as string);
    }
  };

  const handleLike = async () => {
    try {
      likedByUser
        ? await unlikePost(id).unwrap()
        : await likePost({ postId: id }).unwrap();
      if (cardFor === "current-post") await triggerGetPostById(id).unwrap();

      if (cardFor === "post") await triggerGetAllPosts().unwrap();
    } catch (error) {
      if (hasErrorField(error)) {
        setError(error.data.error);
      }

      setError(error as string);
    }
  };

  return (
    <NextCard className="mt-5">
      <CardHeader className="justify-between items-center bg-transparent">
        <Link to={`/users/${authorId}`}>
          <User
            name={name}
            avatarUrl={avatarUrl}
            description={createdAt && formatToClientDate(createdAt)}
            className={"text-small font-semibold leading-none text-default-600"}
          />
        </Link>
        {authorId === currentUser?.id && (
          <div className="cursor-pointer" onClick={handleDelete}>
            {deletePostStatus.isLoading || deleteCommentStatus.isLoading ? (
              <Spinner />
            ) : (
              <RiDeleteBinLine />
            )}
          </div>
        )}
      </CardHeader>
      <CardBody className="px-3 py-2 mb-5 ">
        <Typography>{content}</Typography>
      </CardBody>
      {cardFor !== "comment" && (
        <CardFooter className="gap-3 ">
          <div className="flex gap-5 items-center">
            <div onClick={handleLike}>
              <MetaInfo
                count={likesCount}
                Icon={likedByUser ? FcDislike : MdOutlineFavoriteBorder}
              />
            </div>
            <Link to={`/posts/${id}`}>
              <MetaInfo count={commentsCount} Icon={FaRegComment} />
            </Link>
          </div>

          <ErrorMessage error={error} />
        </CardFooter>
      )}
    </NextCard>
  );
};

export default Card;
