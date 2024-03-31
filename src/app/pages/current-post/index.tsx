import BackButton from "@/app/components/back-button";
import Card from "@/app/components/card";
import CreateComment from "@/app/features/create-comment";
import { useGetPostByIdQuery } from "@/app/services/postAPI";
import { useParams } from "react-router-dom";

const CurrentPostPage = () => {
  const params = useParams<{ id: string }>();
  const { data } = useGetPostByIdQuery(params.id ?? "");

  if (!data) {
    return <h2>This post isnt exist</h2>;
  }

  const {
    id,
    authorId,
    author,
    comments,
    likes,
    likedByUser,
    createdAt,
    content,
  } = data;

  return (
    <>
      <BackButton />
      <Card
        cardFor="current-post"
        avatarUrl={author.avatarUrl ?? ""}
        content={content}
        name={author.name ?? ""}
        likesCount={likes.length}
        commentsCount={comments.length}
        authorId={authorId}
        id={id}
        likedByUser={likedByUser}
        createdAt={createdAt}
      />
      <div className="mt-10">
        <CreateComment />
      </div>
      <div className="mt-10">
        {data.comments
          ? data.comments.map(comment => {
              return (
                <Card
                  cardFor="comment"
                  key={comment.id}
                  avatarUrl={comment.user.avatarUrl ?? ""}
                  content={comment.content}
                  name={comment.user.name ?? ""}
                  authorId={comment.userId}
                  commentId={comment.id}
                  id={id}
                />
              );
            })
          : null}
      </div>
    </>
  );
};

export default CurrentPostPage;
