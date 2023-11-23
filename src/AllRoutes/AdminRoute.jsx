import { Navigate, useLocation } from "react-router-dom";
import PropTypes from 'prop-types';
import useAdmin from "../Hooks/useAdmin";
import useAuth from "../Hooks/useAuth";
import { Spinner } from "@material-tailwind/react";

const AdminRoute = ({ children }) => {
    const {user, loading} = useAuth();
    const [isAdmin, isAdminLoading] = useAdmin();
    const location = useLocation();

    if (loading || isAdminLoading) {
        return <div className="flex justify-center items-center min-h-[600px]">
        <Spinner className="h-12 w-12" />
    </div>
    }

    if (user && isAdmin) {
        return children;
    }
    return <Navigate to="/" state={{ from: location }} replace></Navigate>
};
AdminRoute.propTypes = {
    children: PropTypes.node,
}
export default AdminRoute;
