import { http } from './http';
import { success, fail } from './reply';

const UserAPI = {
  async findCurrent() {
    try {
      const response = await http.get('/users/current');
      return success(response);
    } catch (err) {
      return fail(err.response);
    }
  },

  async create({ data }) {
    try {
      const response = await http.post('/users', data);
      return success(response);
    } catch (err) {
      return fail(err.response);
    }
  },
};

export default UserAPI;
