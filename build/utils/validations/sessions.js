"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validationPost = void 0;

var _celebrate = require("celebrate");

const validationPost = (0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: {
    email: _celebrate.Joi.string().email().required(),
    password: _celebrate.Joi.string().required().min(8)
  }
});
exports.validationPost = validationPost;