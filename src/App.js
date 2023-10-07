import './App.css';
import Layout from './Component/Layout/Layout';
import Home from './Component/Home/Home';
import Cart from './Component/Cart/Cart';
import Products from './Component/Products/Products';
import Brands from './Component/Brands/Brands';
import Categories from './Component/Categories/Categories';
import Login from './Component/Login/Login';
import Register from './Component/Register/Register';
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { AuthContext } from './Component/Context/AuthContext';
import { useEffect, useContext } from 'react';
import ProtectedRouter from './Component/ProtectedRouter';
import ProductDetails from './Component/ProductDetails/ProductDetails';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ForgotPassword from './Component/ForgotPassword/ForgotPassword';
import VerifyCode from './Component/VerifyCode/VerifyCode';
import ResetPassword from './Component/ResetPassword/ResetPassword';
import CheckOut from './Component/CheckOut/CheckOut';
import WishList from './Component/WishList/WishList';
import NotFound from './Component/NotFound/NotFound';
import AllOrders from './Component/AllOrders/AllOrders';


const router = createBrowserRouter([
  {
    path: "", element: <Layout />, children: [
      { index: true, element: <ProtectedRouter><Home /></ProtectedRouter> },
      { path: "Cart", element: <ProtectedRouter><Cart /></ProtectedRouter> },
      { path: "wishList", element: <ProtectedRouter><WishList /></ProtectedRouter> },
      { path: "Products", element: <ProtectedRouter><Products /></ProtectedRouter> },
      { path: "Brands", element: <ProtectedRouter><Brands /></ProtectedRouter> },
      { path: "Categories", element: <ProtectedRouter><Categories /></ProtectedRouter> },
      { path: "allorders", element: <ProtectedRouter><AllOrders /></ProtectedRouter> },
      { path: "Login", element: <Login /> },
      { path: "Register", element: <Register /> },
      { path: "checkOut/:id", element: <ProtectedRouter><CheckOut /></ProtectedRouter> },
      { path: "forgetPassword", element: <ForgotPassword /> },
      { path: "verifyCode", element: <VerifyCode /> },
      { path: "resetPassword", element: <ResetPassword /> },
      { path: "Product-Ditails/:id", element: <ProtectedRouter><ProductDetails /></ProtectedRouter> }
    ]
  },
{path:"*",element:<NotFound/>}
])

function App() {
  const { setUserToken } = useContext(AuthContext);
  useEffect(() => {
    if (localStorage.getItem("userToken")) {
      setUserToken(localStorage.getItem("userToken"))
    }
  }, [])

  return (<>
    <RouterProvider router={router} />
    <ToastContainer />
  </>
  );
}

export default App;
