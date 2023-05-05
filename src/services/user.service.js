import api from './api';

class UserService {
  getPublicContent() {
    return api.get('/user/info');
  }

  getUserBoard() {
    return api.get('/test/user');
  }

  getModeratorBoard() {
    return api.get('/test/mod');
  }

  getAdminBoard() {
    api.get('/test/admin').then((response =>{
      return response.data;
    }));
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new UserService();
