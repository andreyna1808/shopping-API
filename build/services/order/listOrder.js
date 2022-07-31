"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _IOrder = require("../../interface/IOrder");

var _appError = require("../../utils/appError");

var _dec, _dec2, _dec3, _dec4, _class;

let ListOrderService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('OrdersRepository')(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _IOrder.IOrdersRepository === "undefined" ? Object : _IOrder.IOrdersRepository]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class ListOrderService {
  constructor(ordersRepository) {
    this.ordersRepository = ordersRepository;
  }

  async list({
    page,
    limit
  }) {
    const take = limit;
    const skip = (Number(page) - 1) * take;
    const orders = await this.ordersRepository.findAll({
      page,
      skip,
      take
    });
    return orders;
  }

  async listById(id) {
    const order = await this.ordersRepository.findById(id);

    if (!order) {
      throw new _appError.AppError('Order not found.');
    }

    return order;
  }

}) || _class) || _class) || _class) || _class);
var _default = ListOrderService;
exports.default = _default;