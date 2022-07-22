import { celebrate, Joi, Segments } from 'celebrate';

export const validationGetById = celebrate({
  [Segments.PARAMS]: {
    id: Joi.string().uuid().required(),
  },
});

export const validationPost = celebrate({
  [Segments.BODY]: {
    name: Joi.string().required(),
    price: Joi.number().required(),
    quantity: Joi.number().required(),
  },
});

export const validationPut = celebrate({
  [Segments.BODY]: {
    name: Joi.string().required(),
    price: Joi.number().required(),
    quantity: Joi.number().required(),
  },
  [Segments.PARAMS]: {
    id: Joi.string().uuid().required(),
  },
});
export const validationDelete = celebrate({
  [Segments.PARAMS]: {
    id: Joi.string().uuid().required(),
  },
});
