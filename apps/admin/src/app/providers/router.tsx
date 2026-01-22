import { createBrowserRouter } from "react-router-dom";
import WaybillsPage from "@pages/waybills/WaybillsPage";
import Layout from "@shared/ui/Layout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/waybills",
        element: <WaybillsPage />,
      },
    ],
  },
]);
