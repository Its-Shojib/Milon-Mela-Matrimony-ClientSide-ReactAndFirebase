import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home/Home";
import Biodatas from "../Pages/Biodatas/Biodatas";
import AboutUs from "../Pages/About-Us/AboutUs";
import ContactUs from "../Pages/Contact-us/ContactUs";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register.jsx/Register";


const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout></MainLayout>,
        children:[
            {
                index: true,
                element: <Home></Home>
            },
            {
                path:'/biodatas',
                element:<Biodatas></Biodatas>
            },
            {
                path:'/about-us',
                element:<AboutUs></AboutUs>
            },
            {
                path:'/contact-us',
                element:<ContactUs></ContactUs>
            },
            {
                path:'/login',
                element:<Login></Login>
            },
            {
                path:'/register',
                element:<Register></Register>
            },
        ]
    },
]);
export default router;