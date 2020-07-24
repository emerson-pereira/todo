const success = (res, params = {}) => {
  const { data = {}, headers = {}, status = 200 } = params;
  if (headers && Object.keys(headers).length) {
    res.header(headers);
  }
  res.status(status).json(data);
};

const fail = (res, params = {}) => {
  const { message = 'Unexpected error', status = 500 } = params;
  res.status(status).json({ error: { message } });
};

exports.success = success;
exports.fail = fail;
