import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import { store } from "./app/store/store";
import { NextUIProvider } from "@nextui-org/react";
import "./index.css";
import { createBrowserRouter } from "react-router-dom";
import { ThemeProvivider } from "./app/components/theme-provider";

const container = document.getElementById("root");

const router = createBrowserRouter([
  { path: "/auth", element: <h1>Auth</h1> },
  { path: "/", element: <h1>Layout</h1> },
]);

if (container) {
  const root = createRoot(container);

  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <NextUIProvider>
          <ThemeProvivider>
            <App />
          </ThemeProvivider>
        </NextUIProvider>
      </Provider>
    </React.StrictMode>,
  );
} else {
  throw new Error(
    "Root element with ID 'root' was not found in the document. Ensure there is a corresponding HTML element with the ID 'root' in your HTML file.",
  );
}
