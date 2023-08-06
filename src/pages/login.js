import React from "react";

import NewAccount from "../components/Signup/NewAccount";
import CheckLogin from "../components/Login/CheckLogin";
import { CookiesProvider, useCookies } from "react-cookie";


function Login(){
    const [cookies, setCookie] = useCookies(["client"]);

    function handleLogin(client) {
        setCookie("client", client, { path: "/" });
    }

    return(
        <>
            <NewAccount/>
            <CheckLogin onLogin={handleLogin}/>           
        </>
    )
}

export default Login;