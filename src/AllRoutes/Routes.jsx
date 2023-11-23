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
    {
        path:'/dashboard',
        element:<DashBoard></DashBoard>,
        children:[
            //Admin only routes
            {
                path:'admin-home',
                element: <AdminHome></AdminHome>
            },
            {
                path:'manage-user',
                element: <ManageUser></ManageUser>
            },
            {
                path:'approve-con-request',
                element: <ApproveContact></ApproveContact>
            },
            {
                path:'approve-premium',
                element: <ApprovePremium></ApprovePremium>
            },
            {
                path:'success-story',
                element: <SuccessStory></SuccessStory>
            },
            //user only routes
            {
                path:'edit-biodata',
                element: <EditBioData></EditBioData>
            },
            {
                path:'view-bio-data',
                element: <ViewBioData></ViewBioData>
            },
            {
                path:'my-req-contacts',
                element: <MyReqContacts></MyReqContacts>
            },
            {
                path:'favorites',
                element: <Favorites></Favorites>
            },
            {
                path:'got-married',
                element: <GotMarried></GotMarried>
            },
        ]
    }
]);
export default router;