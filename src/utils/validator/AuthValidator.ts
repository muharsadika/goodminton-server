import * as joi from 'joi'

export const adminRegisterSchema = joi.object({
  fullname: joi.string().required(),
  username: joi.string().required(),
  email: joi.string().email().required(),
  password: joi.string().required(),
})

export const adminLoginSchema = joi.object({
  username: joi.string().required(),
  password: joi.string().required(),
})

export const buyerRegisterSchema = joi.object({
  fullname: joi.string().required(),
  email: joi.string().email().required(),
  username: joi.string().required(),
  password: joi.string().required(),
  profile_picture: joi.string(),
  phone: joi.string(),
  address: joi.string(),
})

export const buyerLoginSchema = joi.object({
  username: joi.string().required(),
  password: joi.string().required(),
})