"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ProductsControllers = void 0;

var _tsyringe = require("tsyringe");

var _createProducts = require("../services/products/createProducts");

var _deleteProducts = require("../services/products/deleteProducts");

var _listProducts = require("../services/products/listProducts");

var _updateProducts = require("../services/products/updateProducts");

class ProductsControllers {
  async list(req, res) {
    const messageService = _tsyringe.container.resolve(_listProducts.ListProductsService);

    const page = req.query.page ? Number(req.query.page) : 1;
    const limit = req.query.limit ? Number(req.query.limit) : 15;
    const products = await messageService.list({
      page,
      limit
    });
    return res.status(200).json(products);
  }

  async listById(req, res) {
    const messageService = _tsyringe.container.resolve(_listProducts.ListProductsService);

    const {
      id
    } = req.params;
    const productById = await messageService.listById(id);
    return res.status(200).json(productById);
  }

  async create(req, res) {
    const messageService = _tsyringe.container.resolve(_createProducts.CreateProductsService);

    const {
      name,
      price,
      quantity
    } = req.body;
    const createProduct = await messageService.create({
      name,
      price,
      quantity
    });
    return res.status(201).json(createProduct);
  }

  async update(req, res) {
    const messageService = _tsyringe.container.resolve(_updateProducts.UpdateProductsService);

    const {
      name,
      price,
      quantity
    } = req.body;
    const {
      id
    } = req.params;
    const updateProduct = await messageService.update({
      id,
      name,
      price,
      quantity
    });
    return res.json(updateProduct);
  }

  async delete(req, res) {
    const messageService = _tsyringe.container.resolve(_deleteProducts.DeleteProductsService);

    const {
      id
    } = req.params;
    await messageService.delete(id);
    return res.status(200).json({
      message: 'product removed successfully'
    });
  }

}

exports.ProductsControllers = ProductsControllers;