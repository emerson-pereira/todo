const Joi = require('@hapi/joi');

const projectSchema = Joi.object({ name: Joi.string().required() });

module.exports = projectSchema;
