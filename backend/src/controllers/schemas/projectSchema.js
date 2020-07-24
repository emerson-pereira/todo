const Joi = require('@hapi/joi');

const projectSchema = Joi.object({ name: Joi.string() });

module.exports = projectSchema;
