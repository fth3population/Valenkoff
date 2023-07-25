import React, {useContext} from "react";

import {Link, useNavigate} from "react-router-dom";
import Logo from "../assets/img/logo.svg";
import {Context} from "../index";
import {observer} from "mobx-react-lite";

const Header = () => {
    const {store} = useContext(Context);
    const navigate = useNavigate();
    // console.log("HEADER", store.checkAuth())

    if (store.isAuth && store.role === "ADMIN") {
        return (
            <header className="py-6 mb-12 border-b">
                <div className="container mx-auto flex justify-between items-center">
                    <Link to="/">
                        <img width="200" height="100" src={Logo} alt=""/>
                    </Link>
                    <div className="flex items-center gap-6">
                        <Link to="/mymemes">
                            <h1>my memes</h1>
                        </Link>
                        <Link to="/favorite">
                            <h1>favorite</h1>
                        </Link>
                        <Link to="/stats">
                            <h1>stats</h1>
                        </Link>
                        <a className="hover:text-violet-900" onClick={() => {
                            store.logout()
                            navigate('/login');
                            window.location.reload();
                        }
                        }>
                            Logout
                        </a>
                    </div>
                </div>
            </header>
        )
    }
        if (store.isAuth && store.role === "USER") {
            return (
                <header className="py-6 mb-12 border-b">
                    <div className="container mx-auto flex justify-between items-center">
                        <Link to="/">
                            <img width="200" height="100" src={Logo} alt=""/>
                        </Link>
                        <div className="flex items-center gap-6">
                            <Link to="/mymemes">
                                <h1>my memes</h1>
                            </Link>
                            <Link to="/favorite">
                                <h1>favorite</h1>
                            </Link>
                            <a className="hover:text-violet-900" onClick={() => {
                                store.logout()
                                navigate('/login');
                                window.location.reload();
                            }
                            }>
                                Logout
                            </a>
                        </div>
                    </div>
                </header>
            )
        }
        if (!store.isAuth) {
            return (
                <header className="py-6 mb-12 border-b">
                    <div className="container mx-auto flex justify-between items-center">

                        <Link to="/">
                            <img width="200" height="100" src={Logo} alt=""/>
                        </Link>
                        <div className="flex items-center gap-6">


                            <Link className="hover:text-violet-900" to="/login">
                                Log in
                            </Link>
                            <Link
                                className="bg-violet-700 hover:text-violet-800
                text-white px-4 py-3 rouded-lg transition"
                                to="/register"
                            >
                                Sign up
                            </Link>
                        </div>
                    </div>
                </header>
            )
        }

    };

    export default observer(Header);
