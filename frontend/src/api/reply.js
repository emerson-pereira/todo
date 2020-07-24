export const success = (response) => ({
  data: (response && response.data) || null,
});

export const fail = (response) => {
  if (!response) {
    return {
      error: {
        message: 'No response from server',
      },
    };
  }

  const { data } = response;
  const errorMessage = data && data.error && data.error.message;
  return {
    error: { message: errorMessage || null },
  };
};
