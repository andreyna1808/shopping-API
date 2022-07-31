"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.products = void 0;

var _express = require("express");

var _productsControllers = require("../../controllers/productsControllers");

var _products = require("../../utils/validations/products");

const productsController = new _productsControllers.ProductsControllers();
const products = (0, _express.Router)();
exports.products = products;
products.get('/', productsController.list);
products.get('/:id', _products.validationGetById, productsController.listById);
products.post('/', _products.validationPost, productsController.create);
products.put('/:id', _products.validationPut, productsController.update);
products.delete('/:id', _products.validationDelete, productsController.delete);