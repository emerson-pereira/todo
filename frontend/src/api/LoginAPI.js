import axios from 'axios';

const baseURL = 'http://localhost:4000';

const LoginAPI = {
  async login({ data }) {
    const response = await axios({
      baseURL,
      url: '/login',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data,
    });

    if (response.status === 200) {
      const { data, headers } = response;
      return {
        token: headers['x-auth-token'],
        data,
      };
    }
  },
};

export default LoginAPI;
