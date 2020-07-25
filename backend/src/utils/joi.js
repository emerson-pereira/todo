const getErrorMessage = (error) => error.details[0].message;

exports.getErrorMessage = getErrorMessage;
