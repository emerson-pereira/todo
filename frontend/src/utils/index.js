export const getToken = () => localStorage.getItem('token');
export const setToken = (token) => localStorage.setItem('token', token);
export const removeToken = () => localStorage.removeItem('token');
export const isAuth = () => !!getToken();

export const formatDate = (timestamp) => {
  const date = new Date(timestamp);

  const monthNames = [
    'Jan',
    'Fev',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Ago',
    'Sep',
    'Oct',
    'Nov',
    'Dez',
  ];

  const day = date.getUTCDate();
  const month = monthNames[date.getUTCMonth()];
  const year = date.getUTCFullYear();
  const hour = date.getUTCHours();
  const min = date.getUTCMinutes();

  const formattedDate = `${year}, ${month} ${day} - ${hour}:${min}`;

  return formattedDate;
};
