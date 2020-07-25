const Joi = require('@hapi/joi');

const loginSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string().email(),
});

module.exports = loginSchema;
