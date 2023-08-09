import React from "react";

import { useCookies } from "react-cookie";
import SignIn from "../components/Login/SignIn";

function Login(){
    const [cookies, setCookie] = useCookies(["client"]);

    function handleLogin(client) {
        setCookie("client", client, { path: "/" });
    }

    return(
        <>
            <SignIn onLogin={handleLogin}/>       
        </>
    )
}

export default Login;