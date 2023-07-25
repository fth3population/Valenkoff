import {useEffect, useState} from "react";
import AuthService from "../../services/auth.service";
import {useLocation, Navigate} from "react-router-dom";

const PrivateRoute = (children) => {
    const [currentUser, setCurrentUser] = useState(undefined);
    useEffect(() => {
        const user = AuthService.getCurrentUser();

        if (user) {
            setCurrentUser(user);
        }
    }, []);

    return ( currentUser ? children : (<Navigate to = "/login"/>) );
};

export default PrivateRoute;