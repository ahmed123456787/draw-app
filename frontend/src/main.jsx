import { StrictMode } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { createRoot } from "react-dom/client";
import { store } from "./redux/store.js";
import HomeParent from "./pages/HomeParent.jsx";
import Archive from "./Pages/Archive.jsx";
import ErrorPage from "./Pages/ErrorPage.jsx";
import HomeChild from "./Pages/HomeChild.jsx";
import SignUp from "./Pages/SignUp.jsx";
import SignChild from "./Pages/SignChild.jsx";
import SignIn from "./pages/SignIn.jsx";
import DrawSpace from "./Pages/DrawSpace.jsx";
import LandingPage from "./Pages/LandingPage.jsx";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/home-parent",
    element: <HomeParent />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/home-child",
    element: <HomeChild />,
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
    <Provider store={store}>
      <RouterProvider router={router}></RouterProvider>
    </Provider>
  </StrictMode>
);
