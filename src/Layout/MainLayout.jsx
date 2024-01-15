import { Outlet } from "react-router-dom";

import Footer from "../Shared-Compo/Footer";
import MyNavbar from "../Shared-Compo/MyNavbar";


const MainLayout = () => {
    return (
        <div>
            <div className="max-w-full mx-auto">
                <MyNavbar></MyNavbar>
            </div>
            <div className="max-w-full mx-auto mt-[82px] px-2">
                <Outlet></Outlet>
            </div>
            <div className="max-w-full mx-auto">
                <Footer></Footer>
            </div>
        </div>
    )
}
export default MainLayout;