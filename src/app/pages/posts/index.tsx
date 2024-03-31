import Card from "@/app/components/card";
import CreatePost from "@/app/features/createPost";
import { useGetAllPostsQuery } from "@/app/services/postAPI";

const PostsPage = () => {
  const { data } = useGetAllPostsQuery();

  return (
    <div className="mb-10 w-full ">
      <CreatePost />
      {data && data.length > 0
        ? data.map(
            ({
              content,
              author,
              id,
              authorId,
              comments,
              likes,
              likedByUser,
              createdAt,
            }) => (
              <Card
                key={id}
                avatarUrl={author.avatarUrl ?? ""}
                content={content}
                name={author.name ?? ""}
                likesCount={likes.length}
                commentsCount={comments.length}
                authorId={authorId}
                id={id}
                likedByUser={likedByUser}
                createdAt={createdAt}
                cardFor="post"
              />
            ),
          )
        : null}
    </div>
  );
};

export default PostsPage;
