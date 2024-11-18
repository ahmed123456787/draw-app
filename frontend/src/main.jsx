import { StrictMode } from 'react'
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import HomeParent from "./pages/HomeParent.jsx";
import Archive from "./pages/Archive.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import HomeChild from "./pages/HomeChild.jsx";
import SingIn from "./pages/SignIn.jsx";
import SignUp from "./pages/SignUp.jsx";
import SignChild from "./pages/SignChild.jsx";

import "./index.css";
import SignIn from "./pages/SignIn.jsx";

const router = createBrowserRouter([
  {
    path: "/ch",
    element: <HomeChild />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/archive",
    element: <Archive />,
  },
  {
    path: "/",
    element: <HomeParent />,
  },
  {
    path: "/signIn",
    element: <SignIn />,
  },
  {
    path: "/signUp",
    element: <SignUp />,
  },
  {
    path: "signIn-child",
    element: <SignChild />,
    errorElement: <ErrorPage />,
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
