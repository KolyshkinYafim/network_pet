import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store/store";
import { NextUIProvider } from "@nextui-org/react";
import "./index.css";
import { ThemeProvivider } from "@components/theme-provider";
import AuthPage from "@pages/auth";
import Layout from "@components/layout";
import PostsPage from "@pages/posts";
import CurrentPostPage from "@pages/current-post";
import UserProfilePage from "@pages/user-profile";
import FollowersPage from "@pages/followers";
import FollowingPage from "@pages/following";
import AuthGuard from "./app/features/user/authGuard";

const container = document.getElementById("root");

const router = createBrowserRouter([
  { path: "/auth", element: <AuthPage /> },
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <PostsPage />,
      },
      {
        path: "posts/:id",
        element: <CurrentPostPage />,
      },
      {
        path: "users/:id",
        element: <UserProfilePage />,
      },
      {
        path: "followers",
        element: <FollowersPage />,
      },
      {
        path: "following",
        element: <FollowingPage />,
      },
    ],
  },
]);

if (container) {
  const root = createRoot(container);

  root.render(
    <Provider store={store}>
      <NextUIProvider>
        <ThemeProvivider>
          <AuthGuard>
            <RouterProvider router={router} />
          </AuthGuard>
        </ThemeProvivider>
      </NextUIProvider>
    </Provider>,
  );
} else {
  throw new Error(
    "Root element with ID 'root' was not found in the document. Ensure there is a corresponding HTML element with the ID 'root' in your HTML file.",
  );
}
