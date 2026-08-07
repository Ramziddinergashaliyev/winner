// import { createBrowserRouter } from "react-router-dom";
// import MainLayout from "../layouts/MainLayout";
// import Home from "../pages/home/Home";
// import Contact from "../pages/contact/Contact";
// import Catalog from "../pages/catalog/Catalog";
// import Distrbut from "../pages/distrbut/Distrbut";
// import Details from "../pages/details/Details";
// import SinglePage from "../pages/singlePage/SinglePage";
// import About from "../pages/about/About";

// export const router = createBrowserRouter([
//     {
//         path: "/",
//         element: <MainLayout />,
//         children: [
//             {
//                 path: "/",
//                 element: <Home />
//             },
//             {
//                 path: "/about",
//                 element: <About />
//             },
//             {
//                 path: "/contact",
//                 element: <Contact />
//             },
//             {
//                 path: "/catalog",
//                 element: <Catalog />
//             },
//             {
//                 path: "/distrbuter",
//                 element: <Distrbut />
//             },
//             {
//                 path: "/categories/:id",
//                 element: <Details />
//             },
//             {
//                 path: "/single-products/:id",
//                 element: <SinglePage />
//             }
//         ]
//     }
// ])


import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Leazy from "../components/leazy/Leazy";

// Barcha sahifalarni lazy import qilamiz
const Home = lazy(() => import("../pages/home/Home"));
const Contact = lazy(() => import("../pages/contact/Contact"));
const Catalog = lazy(() => import("../pages/catalog/Catalog"));
const Distrbut = lazy(() => import("../pages/distrbut/Distrbut"));
const Details = lazy(() => import("../pages/details/Details"));
const SinglePage = lazy(() => import("../pages/singlePage/SinglePage"));
const About = lazy(() => import("../pages/about/About"));

// Har bir componentni Suspense bilan o'rab beruvchi helper
const withSuspense = (Component) => (
    <Suspense fallback={<Leazy />}>
        <Component />
    </Suspense>
);

export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                path: "/",
                element: withSuspense(Home)
            },
            {
                path: "/about",
                element: withSuspense(About)
            },
            {
                path: "/contact",
                element: withSuspense(Contact)
            },
            {
                path: "/catalog",
                element: withSuspense(Catalog)
            },
            {
                path: "/distrbuter",
                element: withSuspense(Distrbut)
            },
            {
                path: "/categories/:id",
                element: withSuspense(Details)
            },
            {
                path: "/single-products/:id",
                element: withSuspense(SinglePage)
            }
        ]
    }
])