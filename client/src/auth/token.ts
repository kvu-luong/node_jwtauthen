import jwtDecode, { JwtPayload } from "jwt-decode";
import { EVENT_STORAGE_LOGOUT, REFRESH_TOKEN_URL } from "../utils/constant";
let accessToken = "";
let refreshTokenRequest: any = null;

const ManageToken = {
  setAcessToken: (token: string) => {
    accessToken = token;
  },

  getAccessToken: () => accessToken,

  checkTokenExpired: () => {
    try {
      const { exp } = jwtDecode(ManageToken.getAccessToken()) as JwtPayload;
      const tokenNotExpired = Date.now() <= (exp as number) * 1000;
      return tokenNotExpired;
    } catch (error:any) {
      console.error( "Invalid token to decode"+ error?.message,);
    }
    return false;
  },

  refreshToken: async () => {
    return new Promise((resolve, reject) => {
      fetch(REFRESH_TOKEN_URL, {
        method: "POST",
        credentials: "include",
      })
        .then((response) => {
          const data = response.json();
          resolve(data);
        })
        .catch((error: any) => {
          console.log("Handle refresh token unexpected ", error?.message);
          reject(error);
        });
    });
  },

  getFreshToken: async () => {
    refreshTokenRequest = refreshTokenRequest
      ? refreshTokenRequest
      : ManageToken.refreshToken();
    try {
      const data = await refreshTokenRequest;
      // reset token request for the next expiration
      refreshTokenRequest = null;
      ManageToken.setAcessToken(data.accessToken);
    } catch (error:any) {
      console.error("Unexpected error when get refresh token: " + error?.message );
      return false;
    }

    return true;
  },
};

window.addEventListener('storage', event => {
  if(event.key === EVENT_STORAGE_LOGOUT) ManageToken.setAcessToken("");
})
export default ManageToken;
