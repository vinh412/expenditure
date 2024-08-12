import { createBrowserRouter } from "react-router-dom";
import Expenditure from "./Expenditure";
import MyLayout from "./MyLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MyLayout />,
    children: [
      {
        index: true,
        element: <Expenditure />,
      },
    ],
  },
  // {
  //   path: "/auth/login",
  //   element: <LoginForm />,
  // },
  // {
  //   path: "/u",
  //   element: <UserLayout />,
  //   children: [
  //     {
  //       index: true,
  //       element: <UserSearchPage />
  //     }
  //   ]
  // }
]);

export default router;