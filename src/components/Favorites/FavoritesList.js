import React from "react";
import { CookiesProvider, useCookies } from "react-cookie";
import UserFavorites from "./UserFavorites";
import SignIn from "../Login/SignIn";

function FavoritesList() {
  const [cookies, setCookie] = useCookies(["client"]);

  function handleLogin(client) {
    setCookie("client", client, { path: "/" });
  }

  return (
    <CookiesProvider>
      <div>
        {cookies.client ? (
          <UserFavorites client={cookies.client} />
        ) : (
          <SignIn onLogin={handleLogin} />
        )}
      </div>
    </CookiesProvider>
  );
}

export default FavoritesList;
