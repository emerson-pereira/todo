import { createContext } from 'react';

export const user = {
  name: '',
  email: '',
};

export const UserContext = createContext(user);
