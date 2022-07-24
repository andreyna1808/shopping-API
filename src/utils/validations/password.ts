import { celebrate, Joi, Segments } from 'celebrate';

export const validationPassword = celebrate({
  [Segments.BODY]: {
    token: Joi.string().required(),
    password: Joi.string().required().min(8),
    password_confirm: Joi.string().required().valid(Joi.ref('password')),
  },
});
