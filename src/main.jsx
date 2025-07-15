import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import LoginPage from './pages/login.jsx';
import RegisterPage from './pages/register.jsx';
import UserPage from './pages/user.jsx';
import ProductPage from './pages/product.jsx';
import './styles/global.css'
import ToDoApp from './Components/todo/ToDoApp.jsx';
import ErrorPage from './pages/error.jsx';
import { AuthWrapper } from './Components/context/auth.context.jsx';
import PrivateRoute from './pages/private.route.jsx';
import 'nprogress/nprogress.css'




const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <ToDoApp />
      },
      {
        path: "/users",
        element: <UserPage />,

      },
      {
        path: "/products",
        element:
          <PrivateRoute>
            <ProductPage />
          </PrivateRoute>
      }
    ]
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  }

]);


ReactDOM.createRoot(document.getElementById('root')).render(
  // AuthWrapper có user thì tất cả các component khác đều có user, chỉ cần lấy ra từ context
  <AuthWrapper>
    <RouterProvider router={router} />
  </AuthWrapper>
)
