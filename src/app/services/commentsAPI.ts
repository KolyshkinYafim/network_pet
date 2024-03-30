import { API } from "./API";

export const commentsAPI = API.injectEndpoints({
  endpoints: builder => ({
    createComment: builder.mutation<Comment, Partial<Comment>>({
      query: content => ({
        url: "/comments",
        method: "POST",
        body: content,
      }),
    }),
    deleteComment: builder.mutation<void, string>({
      query: id => ({
        url: `/comments/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const { useCreateCommentMutation, useDeleteCommentMutation } =
  commentsAPI;

export const {
  endpoints: { createComment, deleteComment },
} = commentsAPI;
