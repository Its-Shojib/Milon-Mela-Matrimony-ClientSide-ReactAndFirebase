import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home/Home";
import Biodatas from "../Pages/Biodatas/Biodatas";
import AboutUs from "../Pages/About-Us/AboutUs";
import ContactUs from "../Pages/Contact-us/ContactUs";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register.jsx/Register";
import DashBoard from "../Layout/DashBoard";
import AdminHome from './../Pages/AdminHome/AdminHome';
import ManageUser from './../Pages/ManageUser/ManageUser';
import EditBioData from "../Pages/EditBioData/EditBioData";
import ViewBioData from "../Pages/ViewBioData/ViewBioData";
import MyReqContacts from "../Pages/MyReqContacts/MyReqContacts";
import Favorites from "../Pages/Favorites/Favorites";
import GotMarried from "../Pages/GotMarried/GotMarried";
import ApproveContact from './../Pages/ApproveContacts/ApproveContact';
import ApprovePremium from "../Pages/ApprovePremium/ApprovePremium";
import SuccessStory from "../Pages/SuccessStory/SuccessStory";
import PrivateRoutes from './PrivateRoutes';
import AdminRoute from './AdminRoute';
import ViewProfile from "../Pages/ViewProfile/ViewProfile";
import Checkout from "../Pages/Checkout/Checkout";


const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout></MainLayout>,
        children: [
            {
                index: true,
                element: <Home></Home>
            },
            {
                path: '/biodatas',
                element: <Biodatas></Biodatas>
            },
            {
                path: '/about-us',
                element: <AboutUs></AboutUs>
            },
            {
                path: '/contact-us',
                element: <ContactUs></ContactUs>
            },
            {
                path: '/biodata/profile/:id',
                element:<PrivateRoutes><ViewProfile></ViewProfile></PrivateRoutes>,
                loader: ({params})=> fetch(`http://localhost:5000/biodata/profile/${params.id}`)

            },
            {
                path: '/checkout/:id',
                element:<PrivateRoutes><Checkout></Checkout></PrivateRoutes>,
                loader: ({params})=> fetch(`http://localhost:5000/checkout/${params.id}`)

            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/register',
                element: <Register></Register>
            },
        ]
    },
    {
        path: '/dashboard',
        element: <PrivateRoutes><DashBoard></DashBoard></PrivateRoutes>,
        children: [
            //Admin only routes
            {
                path: 'admin-home',
                element: <AdminRoute><AdminHome></AdminHome></AdminRoute>
            },
            {
                path: 'manage-user',
                element: <AdminRoute><ManageUser></ManageUser></AdminRoute>
            },
            {
                path: 'approve-con-request',
                element: <AdminRoute><ApproveContact></ApproveContact></AdminRoute>
            },
            {
                path: 'approve-premium',
                element: <AdminRoute><ApprovePremium></ApprovePremium></AdminRoute>
            },
            {
                path: 'success-story',
                element: <AdminRoute><SuccessStory></SuccessStory></AdminRoute>
            },
            //user only routes
            {
                path: 'edit-biodata',
                element: <PrivateRoutes><EditBioData></EditBioData></PrivateRoutes>
            },
            {
                path: 'view-bio-data',
                element: <PrivateRoutes><ViewBioData></ViewBioData></PrivateRoutes>
            },
            {
                path: 'my-req-contacts',
                element: <PrivateRoutes> <MyReqContacts></MyReqContacts></PrivateRoutes>
            },
            {
                path: 'favorites',
                element: <PrivateRoutes><Favorites></Favorites></PrivateRoutes>
            },
            {
                path: 'got-married',
                element: <PrivateRoutes><GotMarried></GotMarried></PrivateRoutes>
            },
        ]
    }
]);
export default router;