import { Navigate, useLocation } from "react-router-dom";

import PropTypes from 'prop-types';
import useAuth from "../Hooks/useAuth";
import useAdmin from "../Hooks/useAdmin";

const AdminRoute = ({ children }) => {
    const {user, loading} = useAuth();
    const [isAdmin, isAdminLoading] = useAdmin();
    const location = useLocation();

    if (loading || isAdminLoading) {
        return <progress className="progress w-56"></progress>
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
