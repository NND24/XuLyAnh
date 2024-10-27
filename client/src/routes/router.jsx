import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
import Editor from "../pages/Editor";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/create/editor",
    element: <Editor />,
  },
  { path: "*", element: <NotFound /> },
]);
