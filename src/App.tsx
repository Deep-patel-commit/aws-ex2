import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CheckAdmin from "./components/CheckAdmin";
import CheckAuth from "./components/CheckAuth";
import Layout from "./layout/Layout";
import AdminPage from "./pages/AdminPage";
import EditProfile from "./pages/EditProfile";
import LandingPage from "./pages/LandingPage";
import SignUp from "./pages/SignUp";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    // errorElement: <ErrorPage />,
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
        path: "/test",
        element: <SignUp />,
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
