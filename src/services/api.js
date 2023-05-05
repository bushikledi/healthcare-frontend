import axios from "axios";
import TokenService from "./token.service";

const instance = axios.create({
  baseURL: "http://localhost:8080",
  headers: {"Content-Type": "application/json"}
});

instance.interceptors.request.use(
  (config) => {
    const token = TokenService.getLocalAccessToken();
    if (token) {
      config.headers["Authorization"] = 'Bearer ' + token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const originalConfig = err?.config;
    if (originalConfig.url !== "/user/authenticate" && err.response) {
      if (err.response.status === 401 && !originalConfig._retry && TokenService.getLocalRefreshToken()) {
        originalConfig._retry = true;
        try {
          instance.defaults.headers.common['refresh-token'] = `Bearer ${TokenService.getLocalRefreshToken()}`;
          instance.post("/user/token/refresh").then((response =>{
            TokenService.updateLocalAccessToken(response.data.accessToken);
          }));
          instance.defaults.headers.common['refresh-token'] = '';
          return instance(originalConfig); 
        } catch (_error) {
          return Promise.reject(_error);
        }
      }
    }

    return Promise.reject(err);
  }
);

export default instance;