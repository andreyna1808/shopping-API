import { celebrate, Joi, Segments } from 'celebrate';

export const validationPost = celebrate({
  [Segments.BODY]: {
    email: Joi.string().email().required(),
    password: Joi.string().required().min(8),
  },
});
