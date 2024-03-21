import { JwtPayload, jwtDecode } from "jwt-decode";
import axios from "axios";
import { redirect } from "react-router-dom";

const axiosJWT = axios.create();
axiosJWT.interceptors.request.use(
  async (config) => {
    let accessToken = localStorage.getItem("accessToken");
    let decodedToken : JwtPayload | undefined;
    if (!accessToken) {
      redirect("/login");
    } else {
      decodedToken = jwtDecode(accessToken) as JwtPayload;
    }
    const exp: number | undefined = decodedToken?.exp
    if (exp && Date.now() > exp * 1000) {
      console.log("tokenExpired");
      const refreshData = {
        refreshToken: localStorage.getItem("refreshToken"),
        id: localStorage.getItem("id"),
      };

      const newAccessToken = await axios.post(
        "http://localhost:5000/api/token",
        refreshData
      );
      console.log(newAccessToken);
      localStorage.setItem("accessToken", newAccessToken.data.accessToken);
      accessToken = newAccessToken.data.accessToken;
    }
    config.headers["authorization"] = `Bearer ${accessToken}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
export { axiosJWT };
