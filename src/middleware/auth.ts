import { userAPI } from "@/app/services/userAPI";
import { createListenerMiddleware } from "@reduxjs/toolkit";

export const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
  matcher: userAPI.endpoints.login.matchFulfilled,
  effect: async (action, listener) => {
    listener.cancelActiveListeners();
    if (action.payload.token)
      localStorage.setItem("token", action.payload.token);
  },
});
