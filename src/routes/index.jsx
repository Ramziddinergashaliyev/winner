import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/home/Home";
import About from "../pages/about/About";
import Contact from "../pages/contact/Contact";
import Catalog from "../pages/catalog/Catalog";
import Distrbut from "../pages/distrbut/Distrbut";
import Details from "../pages/details/Details";
import SinglePage from "../pages/singlePage/SinglePage";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/about",
                element: <About />
            },
            {
                path: "/contact",
                element: <Contact />
            },
            {
                path: "/catalog",
                element: <Catalog />
            },
            {
                path: "/distrbuter",
                element: <Distrbut />
            },
            {
                path: "/details",
                element: <Details />
            },
            {
                path: "/single-products",
                element: <SinglePage />
            }
        ]
    }
])