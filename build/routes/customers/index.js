"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.custom = void 0;

var _express = require("express");

var _customControllers = require("../../controllers/customControllers");

var _isAuth = _interopRequireDefault(require("../../middlewares/isAuth"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const customController = new _customControllers.CustomControllers();
const custom = (0, _express.Router)();
exports.custom = custom;
custom.use(_isAuth.default);
custom.get('/', customController.list);
custom.get('/:id', customController.listById);
custom.post('/', customController.create);
custom.put('/:id', customController.update);
custom.delete('/:id', customController.delete);