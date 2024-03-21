import { API } from "./API"

export const followAPI = API.injectEndpoints({
  endpoints: builder => ({
    followUser: builder.mutation<void, string>({
      query: id => ({
        url: `/follow/${id}`,
        method: "POST",
      }),
    }),
    unfollowUser: builder.mutation<void, string>({
      query: id => ({
        url: `/unfollow/${id}`,
        method: "DELETE",
      }),
    }),
  }),
})

export const { useFollowUserMutation, useUnfollowUserMutation } = followAPI

export const {
  endpoints: { followUser, unfollowUser },
} = followAPI
