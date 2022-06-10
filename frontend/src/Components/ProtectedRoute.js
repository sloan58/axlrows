import { Navigate, Outlet } from 'react-router-dom';
import {useContext} from "react";
import AppContext from "../store/AppContext";

const ProtectedRoute = ({ children }) => {
    const {state} = useContext(AppContext)
    if (!state.logged_in) {
        return <Navigate to="/login" replace />;
    }

    return children ? children : <Outlet />;
};

export default ProtectedRoute
