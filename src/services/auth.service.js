import api from "./api";
import TokenService from "./token.service";

class AuthService {
  login(email, password) {
    return api
      .post("/user/authenticate", {
        email,
        password
      })
      .then(response => {
        if (response.data.accessToken) {
          TokenService.setTokens(response.data);
        }
        return response.data;
      });
  }

  logout() {
    TokenService.removeTokens();
    return api.post("/user/logout");
  }
  

  register(email, password, firstname, lastname, gender, dateOfBirth) {
    return api.post("/user/register", {
      email,
      password,
      firstname,
      lastname,
      gender,
      dateOfBirth
    }).then(response => {
      if (response.data.accessToken) {
        TokenService.setTokens(response.data);
      }
      return response.data;
    });
  }

  getCurrentUser() {

    if(TokenService.getLocalRefreshToken())
      return api.get("/user/info");
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new AuthService();
