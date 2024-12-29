import { StrictMode } from "react";
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
import LandingPage from "./Pages/LandingPage.jsx";

const router = createBrowserRouter([
  {
    path: "/home-parent",
    element: <HomeParent />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/home-child",
    element: <HomeChild/>,
    errorElement: <ErrorPage />,
  },
  {
    path: "/archive",
    element: <Archive />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/sign-in",
    element: <SignIn />,
  },
  {
    path: "/sign-up",
    element: <SignUp />,
  },
  {
    path: "sign-in-child",
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
