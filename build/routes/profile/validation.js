"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validationProfile = void 0;

var _celebrate = require("celebrate");

const validationProfile = (0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: {
    name: _celebrate.Joi.string().required(),
    email: _celebrate.Joi.string().email().required(),
    old_password: _celebrate.Joi.string(),
    password: _celebrate.Joi.string().optional(),
    password_confirm: _celebrate.Joi.string().valid(_celebrate.Joi.ref('password')).when('password', {
      is: _celebrate.Joi.exist(),
      then: _celebrate.Joi.required()
    })
  }
});
exports.validationProfile = validationProfile;