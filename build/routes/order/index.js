"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.orders = void 0;

var _express = require("express");

var _orderControllers = require("../../controllers/orderControllers");

var _isAuth = _interopRequireDefault(require("../../middlewares/isAuth"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const ordersController = new _orderControllers.OrdersControllers();
const orders = (0, _express.Router)();
exports.orders = orders;
orders.use(_isAuth.default);
orders.get('/:id', ordersController.list);
orders.post('/', ordersController.create);