import api from './api';

class UserService {
  getPublicContent() {
    return api.get('/user/info');
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new UserService();
