import * as joi from 'joi'

export const addProductSchema = joi.object({
  product_name: joi.string().required(),
  product_quantity: joi.number().required(),
  product_price: joi.number().required(),
  product_description: joi.string(),
  product_image_1: joi.string().allow(''),
  product_image_2: joi.string().allow(''),
  product_image_3: joi.string().allow(''),
  brand_id: joi.string().required(),
  category_id: joi.string().required()
})

export const updateProductSchema = joi.object({
  product_name: joi.string(),
  product_quantity: joi.number(),
  product_price: joi.number(),
  product_description: joi.string(),
  product_image_1: joi.string(),
  product_image_2: joi.string(),
  product_image_3: joi.string(),
  brand_id: joi.string(),
  category_id: joi.string()
})