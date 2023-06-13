import React from "react";
import ReactDOM  from "react-dom/client";
import Dashboard from "./src/component/Dashboard";
import Footer from "./src/component/Footer";
import Header from "./src/component/Header";
import About from "./src/component/About";
import Shimmer from "./src/component/Shimmer";
import Error from "./src/component/Error";
import Search from "./src/component/Search";
import Help from "./src/component/Help";
import Offers from "./src/component/Offers";
import SignIn from "./src/component/SignIn";
import Cart from "./src/component/Cart";
import { createBrowserRouter, Outlet, RouterProvider, } from "react-router-dom";
import View from "./src/component/View";
import { Provider } from "react-redux";
import Store from "./src/redux/Store";
import Success from "./src/component/Success";
import Fail from "./src/component/Fail";

const App = () => {
    return (
        <Provider store={Store}>
        <Header />
        <Outlet />
        <Footer/>
        </Provider>
    )
}

const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      errorElement : <Error />,
      children: [
        {
          path: "/",
          element: <Dashboard />,
        },
        {
          path: "about",
          element: <About />,
        },
        {
          path: "search",
          element: <Search />,
        },
        {
          path: "help",
          element: <Help />,
        },
        {
          path: "offers",
          element: <Offers />,
        },
        {
          path: "signin",
          element: <SignIn />,
        },
        {
          path: "cart",
          element: <Cart />,
        },
        {
          path: "view/:id",
          element: <View />,
        },
        {
          path: "paymentSuccess",
          element: <Success />,
        },
        {
          path: "paymentFail",
          element: <Fail />,
        },
      ],
    },
  ]);

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(<RouterProvider router={router} fallbackElement={<Shimmer />} />)
