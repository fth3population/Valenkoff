import {useContext} from "react";
import {Navigate, Outlet} from "react-router-dom";
import {Context} from "../index";


const PrivateRoute = () => {
    const {store} = useContext(Context);
    return ( store.role === "ADMIN" ? <Outlet/> : (<Navigate to = "/"/>) );
};

export default PrivateRoute;