import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CheckAdmin from "./components/CheckAdmin";
import CheckAuth from "./components/CheckAuth";
import Layout from "./layout/Layout";
import AdminPage from "./pages/AdminPage";
import ConfirmEmail from "./pages/ConfirmEmail";
import EditProfile from "./pages/EditProfile";
import LandingPage from "./pages/LandingPage";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <LandingPage />,
      },
      {
        path: "/editProfile",
        element: <CheckAuth />,
        children: [
          {
            index: true,
            element: <EditProfile />,
          },
        ],
      },
      {
        path: "/admin123",
        element: <CheckAdmin />,
        children: [
          {
            index: true,
            element: <AdminPage />,
          },
        ],
      },
      {
        path: "/sign-up",
        element: <SignUp />,
      },
      {
        path: "/sign-in",
        element: <SignIn />,
      },
      {
        path: "/confirm-email",
        element: <ConfirmEmail />,
      },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
