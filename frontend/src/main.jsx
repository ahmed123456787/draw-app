import { StrictMode } from 'react'
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import HomeParent from "./Pages/HomeParent.jsx";
import Archive from "./Pages/Archive.jsx";
import ErrorPage from "./Pages/ErrorPage.jsx";
import HomeChild from "./Pages/HomeChild.jsx";
import SingIn from "./Pages/SignIn.jsx";
import SignUp from "./Pages/SignUp.jsx";
import SignChild from "./Pages/SignChild.jsx";
import App from "./App.jsx";
import "./index.css";
import SignIn from "./Pages/SignIn.jsx";
import DrawSpace from "./Pages/DrawSpace.jsx";

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
    element: <App />,
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
  {
    path: "/draw-space",
    element: <DrawSpace />,
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
