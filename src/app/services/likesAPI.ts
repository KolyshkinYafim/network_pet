import { API } from "./API"
import type { Like } from "../types/types"

export const likesAPI = API.injectEndpoints({
  endpoints: builder => ({
    likePost: builder.mutation<Like, string>({
      query: post => ({
        url: "/likes",
        method: "POST",
        body: post,
      }),
    }),
    unlikePost: builder.mutation<void, string>({
      query: id => ({
        url: `/likes/${id}`,
        method: "DELETE",
      }),
    }),
  }),
})

export const { useLikePostMutation, useUnlikePostMutation } = likesAPI

export const {
  endpoints: { likePost, unlikePost },
} = likesAPI
