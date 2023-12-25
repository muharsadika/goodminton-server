import * as joi from 'joi'

export const registerSchema = joi.object({
  fullname: joi.string().required(),
  username: joi.string().required(),
  email: joi.string().email().required(),
  password: joi.string().required(),
  // phone: joi.string(),
  // address: joi.string(),
})

export const loginSchema = joi.object({
  username: joi.string().required(),
  password: joi.string().required(),
})