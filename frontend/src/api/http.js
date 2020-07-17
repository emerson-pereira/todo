import axios from 'axios';
import { getToken, setToken } from '../utils';

const baseURL = 'http://localhost:4000';

const instance = axios.create({ baseURL });

instance.defaults.headers.post['Content-Type'] = 'application/json';
instance.defaults.headers.put['Content-Type'] = 'application/json';

instance.interceptors.request.use(
  (config) => {
    const token = getToken();
    config.headers = { 'x-access-token': token };
    return config;
  },
  (err) => Promise.reject(err)
);

instance.interceptors.response.use(
  (response) => {
    const token = response.headers['x-auth-token'];
    token && setToken(token);
    return response;
  },
  (err) => Promise.reject(err)
);

export const http = instance;
