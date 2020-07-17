import axios from 'axios';

const baseURL = 'http://localhost:4000';

const UserAPI = {
  async createUser({ data }) {
    try {
      const response = await axios({
        baseURL,
        url: '/users',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        data,
      });

      if (response.status === 201) {
        const { data, headers } = response;
        return {
          token: headers['x-auth-token'],
          data,
        };
      }
    } catch (err) {
      console.error(err);
    }
  },

  async getUser({ token }) {
    try {
      const response = await axios({
        baseURL,
        url: '/users/current',
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': token,
        },
      });

      if (response.status === 200) {
        const { data } = response;
        return data;
      }
    } catch (err) {
      console.error(err);
    }
  },
};

export default UserAPI;
