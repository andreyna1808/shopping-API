"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validationPut = exports.validationPost = exports.validationGetById = exports.validationDelete = void 0;

var _celebrate = require("celebrate");

const validationGetById = (0, _celebrate.celebrate)({
  [_celebrate.Segments.PARAMS]: {
    id: _celebrate.Joi.string().uuid().required()
  }
});
exports.validationGetById = validationGetById;
const validationPost = (0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: {
    name: _celebrate.Joi.string().required(),
    price: _celebrate.Joi.number().required(),
    quantity: _celebrate.Joi.number().required()
  }
});
exports.validationPost = validationPost;
const validationPut = (0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: {
    name: _celebrate.Joi.string().required(),
    price: _celebrate.Joi.number().required(),
    quantity: _celebrate.Joi.number().required()
  },
  [_celebrate.Segments.PARAMS]: {
    id: _celebrate.Joi.string().uuid().required()
  }
});
exports.validationPut = validationPut;
const validationDelete = (0, _celebrate.celebrate)({
  [_celebrate.Segments.PARAMS]: {
    id: _celebrate.Joi.string().uuid().required()
  }
});
exports.validationDelete = validationDelete;