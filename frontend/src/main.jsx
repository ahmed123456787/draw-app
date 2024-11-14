import { StrictMode } from 'react'
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import HomeChild from "./pages/HomeParent.jsx";
import Archive from "./pages/Archive.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeChild />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/archive",
    element: <Archive />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider
      router={router}
      future={{
        v7_startTransition: true,
      }}
    ></RouterProvider>
  </StrictMode>
);
