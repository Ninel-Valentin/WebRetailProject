import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";

import "./storage/style/index.css";
import "./storage/style/mobile/mobile.css";
import "./storage/style/desktop/desktop.css";

import Root from "./storage/pages/Root";

import Home from './storage/pages/Home';
import ProductPage from './storage/pages/ProductPage';
import CategoryPage from './storage/pages/CategoryPage';
import BrandPage from './storage/pages/BrandPage';
import Account from "./storage/pages/Account";
import Access from "./storage/pages/account/Access";

import NoPage from './storage/pages/NoPage';
import ErrorPage from './storage/pages/ErrorPage';
import ServerError from './storage/pages/ServerError';

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "",
                element: <Home />,
                errorElement: <ErrorPage />,
            },
            {
                path: "/p/:sku",
                element: <ProductPage />,
                errorElement: <ErrorPage />
            },
            {
                path: "/b/:brandId",
                element: <BrandPage />,
                errorElement: <ErrorPage />
            },
            {
                path: "/c/:categoryId",
                element: <CategoryPage />,
                errorElement: <ErrorPage />
            },
            {
                path: "/access",
                element: <Access />,
                errorElement: <ErrorPage />
            },
            {
                path: "/account",
                element: <Account />,
                errorElement: <ErrorPage />
            }
        ]
    },
    {
        path: "/500",
        element: <ServerError />,
        errorElement: <ErrorPage />
    },
    {
        path: "*",
        element: <NoPage />,
        errorElement: <ErrorPage />
    }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);