import { createBrowserRouter } from "react-router-dom";
import { NaverPage } from "@/pages";
import { PATH } from "./constants";
import Layout from "./layout";

const router = createBrowserRouter([
  {
    path: PATH.main,
    element: <Layout />,
    children: [
      {
        path: PATH.main,
        element: <NaverPage />,
      },
    ],
  },
]);

export default router;
