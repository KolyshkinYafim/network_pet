import { useSelector, type TypedUseSelectorHook } from "react-redux";
import type { Action, ThunkAction } from "@reduxjs/toolkit";
import { configureStore } from "@reduxjs/toolkit";
import { API } from "../services/API";
import userSlice from "./slices/userSlice";
import { combineReducers } from "@reduxjs/toolkit";
import { listenerMiddleware } from "@/middleware/auth";

const rootReducer = combineReducers({
  [API.reducerPath]: API.reducer,
  userSlice,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => {
    return getDefaultMiddleware()
      .concat(API.middleware)
      .prepend(listenerMiddleware.middleware);
  },
});

export type AppStore = typeof store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = AppStore["dispatch"];
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>;

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
