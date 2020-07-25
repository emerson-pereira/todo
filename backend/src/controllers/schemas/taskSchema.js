const Joi = require('@hapi/joi');

const taskSchema = Joi.object({ name: Joi.string().required() });

module.exports = taskSchema;
