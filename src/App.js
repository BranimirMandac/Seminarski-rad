import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/Login";
import Chat from "./components/Chat";
import routes from "./data/routes";
import "./App.css";

export default function App() {
  
  
  const router = createBrowserRouter([
    {
      path: routes.login,
      element: <Login />,
    },
    {
      path: routes.chat,
      element: <Chat />,
    },
  ]);
  
  return <RouterProvider router={router} />;
}
