import axios from 'axios';

const baseURL = 'http://localhost:4000';

const UserAPI = {
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
