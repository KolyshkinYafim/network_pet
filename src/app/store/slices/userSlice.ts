import { userAPI } from "@/app/services/userAPI";
import { type User } from "@/app/types/types";
import { createSlice } from "@reduxjs/toolkit";
import { type RootState } from "../store";

interface InitialState {
  user: User | null;
  isAuth: boolean;
  users: User[] | null;
  current: User | null;
  token?: string;
}

const initialState: InitialState = {
  user: null,
  isAuth: false,
  users: null,
  current: null,
};

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    logout: () => initialState,
    resetUser: state => {
      state.user = null;
    },
  },
  extraReducers: builder => {
    builder
      .addMatcher(userAPI.endpoints.login.matchFulfilled, (state, action) => {
        state.token = action.payload.token;
        state.isAuth = true;
      })
      .addMatcher(userAPI.endpoints.current.matchFulfilled, (state, action) => {
        state.isAuth = true;
        state.current = action.payload;
      })
      .addMatcher(
        userAPI.endpoints.getUserById.matchFulfilled,
        (state, action) => {
          state.user = action.payload;
        },
      );
  },
});

export const { logout, resetUser } = userSlice.actions;

export default userSlice.reducer;

export const selectIsAuth = (state: RootState) => {
  return state.userSlice.isAuth;
};

export const selectCurrentUser = (state: RootState) => {
  return state.userSlice.current;
};

export const selectUser = (state: RootState) => {
  return state.userSlice.user;
};
