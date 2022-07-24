import { celebrate, Joi, Segments } from 'celebrate';

export const validationProfile = celebrate({
  [Segments.BODY]: {
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    old_password: Joi.string(),
    password: Joi.string().optional(),
    password_confirm: Joi.string().valid(Joi.ref('password')).when('password', {
      is: Joi.exist(),
      then: Joi.required(),
    }),
  },
});
