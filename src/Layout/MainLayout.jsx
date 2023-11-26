import { Outlet } from "react-router-dom";

import Footer from "../Shared-Compo/Footer";
import MyNavbar from "../Shared-Compo/MyNavbar";


const MainLayout = () => {
    return (
        <div>
            <div className="max-w-screen-xl mx-auto">
                <MyNavbar></MyNavbar>
            </div>
            <div className="max-w-screen-xl mx-auto mt-[82px]">
                <Outlet></Outlet>
            </div>
            <div className="max-w-screen-xl mx-auto">
                <Footer></Footer>
            </div>
        </div>
    )
}
export default MainLayout;