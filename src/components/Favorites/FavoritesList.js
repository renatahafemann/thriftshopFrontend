import React from "react";
import ProductList from "../ProductsList/ProductsList";
import { CookiesProvider, useCookies } from "react-cookie";
import CheckLogin from "../Login/CheckLogin";
import UserFavorites from "./UserFavorites";

function FavoritesList() {
  const [cookies, setCookie] = useCookies(["client"]);

  function handleLogin(client) {
    setCookie("client", client, { path: "/" });
  }

  return (
    <CookiesProvider>
      <div>
        {cookies.client ? (
          <UserFavorites client={cookies.client}/>
        ) : (
          <CheckLogin onLogin={handleLogin} />
        )}
      </div>
    </CookiesProvider>
  );
}

export default FavoritesList;