import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Provider } from "react-redux";
import store from "./redux/store";
import { Route, RouterProvider, createRoutesFromElements } from "react-router";
import { createBrowserRouter } from "react-router-dom";
import "flowbite";

import PrivateRoute from "./components/PrivateRoute";

// Auth
import Login from "./pages/Auth/Login.tsx";
import Register from "./pages/Auth/Register.tsx";

import AdminRoute from "./pages/Admin/AdminRoute.tsx";
import Profile from "./pages/User/Profile.tsx";
import UserList from "./pages/Admin/UserList.tsx";

import CategoryList from "./pages/Admin/CategoryList.tsx";

import ProductList from "./pages/Admin/ProductList.tsx";
import AllProducts from "./pages/Admin/AllProducts.tsx";
import ProductUpdate from "./pages/Admin/ProductUpdate.tsx";

import Home from "./pages/Home.tsx";
import Favorites from "./pages/Products/Favorites.tsx";
import ProductDetails from "./pages/Products/ProductDetails.tsx";

import Cart from "./pages/Cart.tsx";
import Shop from "./pages/Shop.tsx";

import Shipping from "./pages/Orders/Shipping.tsx";
import PlaceOrder from "./pages/Orders/PlaceOrder.tsx";
import Order from "./pages/Orders/Order.tsx";
import UserOrder from "./pages/User/UserOrder.tsx";
import OrderList from "./pages/Admin/OrderList.tsx";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import AdminDashboard from "./pages/Admin/AdminDashboard.tsx";
import NotFound from "./pages/NotFound.tsx";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<App />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route index={true} path="/" element={<Home />} />
            <Route path="/favorite" element={<Favorites />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/shop" element={<Shop />} />

            {/* Registered users */}
            <Route path="" element={<PrivateRoute />}>
                <Route path="/profile" element={<Profile />} />
                <Route path="/shipping" element={<Shipping />} />
                <Route path="/placeorder" element={<PlaceOrder />} />
                <Route path="/order/:id" element={<Order />} />
                <Route path="/user-orders" element={<UserOrder />} />
            </Route>

            <Route path="/admin" element={<AdminRoute />}>
                <Route path="userlist" element={<UserList />} />
                <Route path="categorylist" element={<CategoryList />} />
                <Route path="productlist" element={<ProductList />} />
                <Route path="allproductslist" element={<AllProducts />} />
                <Route path="productlist/:pageNumber" element={<ProductList />} />
                <Route path="product/update/:_id" element={<ProductUpdate />} />
                <Route path="orderlist" element={<OrderList />} />
                <Route path="dashboard" element={<AdminDashboard />} />
            </Route>

            {/* 404 Catch-all route */}
            <Route path="*" element={<NotFound />} />
        </Route>
    )
);

ReactDOM.createRoot(document.getElementById("root")!).render(
    <Provider store={store}>
        <PayPalScriptProvider>
            <RouterProvider router={router} />
        </PayPalScriptProvider>
    </Provider>
);
