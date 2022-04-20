import {useLocation, Navigate, Outlet, useNavigate} from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import Layout from "./Layout";

const RequireAuth = () => {
    const{auth} = useAuth();
    const location = useLocation();
    return(
        auth?.email ? <Outlet /> : <Navigate to="/" state={{from: location}} replace />
    );

}
export default RequireAuth;