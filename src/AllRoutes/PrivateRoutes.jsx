
import { Navigate, useLocation } from "react-router-dom";
import PropTypes from 'prop-types';
import useAuth from "../Hooks/useAuth";
import { Spinner } from "@material-tailwind/react";



const PrivateRoutes = ({ children }) => {
    let { user, loading } = useAuth();
    let location = useLocation();
    if (loading) {
        return <div className="flex justify-center items-center min-h-[600px]">
            <Spinner className="h-12 w-12" />
        </div>
    }
    if(user){
        return children;
    }
    return <Navigate to='/login' state={{from: location}} replace></Navigate>
};
PrivateRoutes.propTypes = {
    children: PropTypes.node,
}
export default PrivateRoutes;