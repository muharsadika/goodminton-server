import * as joi from 'joi'

export const addProductSchema = joi.object({
  product_name: joi.string().required(),
  product_quantity: joi.number().required(),
  product_price: joi.number().required(),
  product_description: joi.string().required(),
  product_image_1: joi.string(),
  product_image_2: joi.string(),
  product_image_3: joi.string(),
  brand_id: joi.number().required(),
  category_id: joi.number().required()
})