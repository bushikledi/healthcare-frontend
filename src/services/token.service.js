class TokenService {
  getLocalRefreshToken() {
    return JSON.parse(localStorage.getItem("refreshToken"));
  }

  getLocalAccessToken() {
    return JSON.parse(localStorage.getItem("accessToken"));
  }

  updateLocalAccessToken(token) {
    localStorage.setItem("accessToken", JSON.stringify(token));
  }

  setTokens(user){
    console.log(JSON.stringify(user));
    localStorage.setItem("refreshToken", JSON.stringify(user.refreshToken));
    localStorage.setItem("accessToken", JSON.stringify(user.accessToken));
  }

  removeTokens(){
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("accessToken");
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new TokenService();
