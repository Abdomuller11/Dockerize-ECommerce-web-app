import Joi from 'joi';

const ProductSchema = Joi.object({
  title: Joi.string(),
  description: Joi.string().min(3),
  price: Joi.string(),
  photos: Joi.string(),
});

export default ProductSchema;
