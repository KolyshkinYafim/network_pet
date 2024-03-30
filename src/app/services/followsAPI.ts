import { API } from "./API";

export const followAPI = API.injectEndpoints({
  endpoints: builder => ({
    followUser: builder.mutation<void, { followingId: string }>({
      query: body => ({
        url: `/follow`,
        method: "POST",
        body,
      }),
    }),
    unfollowUser: builder.mutation<void, string>({
      query: id => ({
        url: `/unfollow/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const { useFollowUserMutation, useUnfollowUserMutation } = followAPI;

export const {
  endpoints: { followUser, unfollowUser },
} = followAPI;
