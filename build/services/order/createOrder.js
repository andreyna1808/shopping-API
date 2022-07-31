"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _ICustomer = require("../../interface/ICustomer");

var _IOrder = require("../../interface/IOrder");

var _IProducts = require("../../interface/IProducts/IProducts");

var _appError = require("../../utils/appError");

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class;

let CreateOrderService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('OrdersRepository')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('CustomersRepository')(target, undefined, 1);
}, _dec4 = function (target, key) {
  return (0, _tsyringe.inject)('ProductsRepository')(target, undefined, 2);
}, _dec5 = Reflect.metadata("design:type", Function), _dec6 = Reflect.metadata("design:paramtypes", [typeof _IOrder.IOrdersRepository === "undefined" ? Object : _IOrder.IOrdersRepository, typeof _ICustomer.ICustomersRepository === "undefined" ? Object : _ICustomer.ICustomersRepository, typeof _IProducts.IProductsRepository === "undefined" ? Object : _IProducts.IProductsRepository]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = _dec6(_class = class CreateOrderService {
  constructor(ordersRepository, customersRepository, productsRepository) {
    this.ordersRepository = ordersRepository;
    this.customersRepository = customersRepository;
    this.productsRepository = productsRepository;
  }

  async create({
    customer_id,
    products
  }) {
    const customerExists = await this.customersRepository.findById(customer_id);

    if (!customerExists) {
      throw new _appError.AppError('Could not find any customer with the given id.');
    }

    const existsProducts = await this.productsRepository.findAllByIds(products);

    if (!existsProducts.length) {
      throw new _appError.AppError('Could not find any products with the given ids.');
    }

    const existsProductsIds = existsProducts.map(product => product.id);
    const checkInexistentProducts = products.filter(product => !existsProductsIds.includes(product.id));

    if (checkInexistentProducts.length) {
      throw new _appError.AppError(`Could not find product ${checkInexistentProducts[0].id}.`);
    }

    const quantityAvailable = products.filter(product => existsProducts.filter(p => p.id === product.id)[0].quantity < product.quantity);

    if (quantityAvailable.length) {
      throw new _appError.AppError(`The quantity ${quantityAvailable[0].quantity}
         is not available for ${quantityAvailable[0].id}.`);
    }

    const serializedProducts = products.map(product => ({
      product_id: product.id,
      quantity: product.quantity,
      price: existsProducts.filter(p => p.id === product.id)[0].price
    }));
    const order = await this.ordersRepository.create({
      customer: customerExists,
      products: serializedProducts
    });
    const {
      order_products
    } = order;
    const updatedProductsQuantity = order_products.map(product => ({
      id: product.product_id,
      quantity: existsProducts.filter(p => p.id === product.product_id)[0].quantity - product.quantity
    }));
    await this.productsRepository.updateStock(updatedProductsQuantity);
    return order;
  }

}) || _class) || _class) || _class) || _class) || _class) || _class);
var _default = CreateOrderService;
exports.default = _default;