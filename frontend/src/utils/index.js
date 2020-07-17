export const getToken = () => localStorage.getItem('token');
export const isAuth = () => !!getToken();
