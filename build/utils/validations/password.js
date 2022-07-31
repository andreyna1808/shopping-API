"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validationPassword = void 0;

var _celebrate = require("celebrate");

const validationPassword = (0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: {
    token: _celebrate.Joi.string().required(),
    password: _celebrate.Joi.string().required().min(8),
    password_confirm: _celebrate.Joi.string().required().valid(_celebrate.Joi.ref('password'))
  }
});
exports.validationPassword = validationPassword;