"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OrdersControllers = void 0;

var _tsyringe = require("tsyringe");

var _createOrder = _interopRequireDefault(require("../services/order/createOrder"));

var _listOrder = _interopRequireDefault(require("../services/order/listOrder"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class OrdersControllers {
  async list(req, res) {
    const page = req.query.page ? Number(req.query.page) : 1;
    const limit = req.query.limit ? Number(req.query.limit) : 15;

    const listOrders = _tsyringe.container.resolve(_listOrder.default);

    const products = await listOrders.list({
      page,
      limit
    });
    return res.status(200).json(products);
  }

  async listById(req, res) {
    const messageService = _tsyringe.container.resolve(_listOrder.default);

    const {
      id
    } = req.params;
    const products = await messageService.listById(id);
    return res.status(200).json(products);
  }

  async create(req, res) {
    const messageService = _tsyringe.container.resolve(_createOrder.default);

    const {
      customer_id,
      products
    } = req.body;
    const createProduct = await messageService.create({
      customer_id,
      products
    });
    return res.status(201).json(createProduct);
  }

}

exports.OrdersControllers = OrdersControllers;