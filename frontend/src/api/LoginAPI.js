import { http } from './http';
import { success, fail } from './reply';

const LoginAPI = {
  async login({ data }) {
    try {
      const response = await http.post('/login', data);
      return success(response);
    } catch (err) {
      return fail(err.response);
    }
  },
};

export default LoginAPI;
