import { Outlet } from "react-router-dom";
import Navbar from "../Shared-Compo/Navbar";
import Footer from "../Shared-Compo/Footer";


const MainLayout = () => {
    return (
        <div>
            <div className="max-w-screen-xl mx-auto">
                <Navbar></Navbar>
            </div>
            <div className="max-w-screen-xl mx-auto">
                <Outlet></Outlet>
            </div>
            <div className="max-w-screen-xl mx-auto">
                <Footer></Footer>
            </div>
        </div>
    )
}
export default MainLayout;