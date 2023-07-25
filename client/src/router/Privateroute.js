import {useContext} from "react";
import {Navigate, Outlet} from "react-router-dom";
import {Context} from "../index";


const PrivateRoute = () => {
    const {store} = useContext(Context);
    return ( store.isAuth ? <Outlet/> : (<Navigate to = "/login"/>) );
};

export default PrivateRoute;