import Cookies from "js-cookie";
import { Navigate, Outlet } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const AuthRoute = () => {
  let accessToken = Cookies.get("accessToken");

  const isAccessTokenExpired = () => {
    try {
      if (!accessToken) return true;
      const accessTokenDecoded = jwtDecode(accessToken);
      if (accessTokenDecoded) {
        const { exp } = accessTokenDecoded;
        const isExpired = exp && exp < Math.ceil(Date.now() / 1000);
        return isExpired;
      }
    } catch (e) {
      return true;
    }
  };
  return accessToken && !isAccessTokenExpired() ? (
    <Outlet />
  ) : (
    <Navigate to="/connexion" />
  );
};

export default AuthRoute;
