"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CustomControllers = void 0;

var _tsyringe = require("tsyringe");

var _createCustom = require("../services/customers/createCustom");

var _deleteCustom = require("../services/customers/deleteCustom");

var _listCustom = require("../services/customers/listCustom");

var _updateCustom = require("../services/customers/updateCustom");

class CustomControllers {
  async list(req, res) {
    const messageService = _tsyringe.container.resolve(_listCustom.ListCustomerService);

    const page = req.query.page ? Number(req.query.page) : 1;
    const limit = req.query.limit ? Number(req.query.limit) : 15;
    const products = await messageService.list({
      page,
      limit
    });
    return res.status(200).json(products);
  }

  async listById(req, res) {
    const messageService = _tsyringe.container.resolve(_listCustom.ListCustomerService);

    const {
      id
    } = req.params;
    const productById = await messageService.listById(id);
    return res.status(200).json(productById);
  }

  async create(req, res) {
    const {
      name,
      email
    } = req.body;

    const messageService = _tsyringe.container.resolve(_createCustom.CreateCustomService);

    const createProduct = await messageService.create({
      name,
      email
    });
    return res.status(201).json(createProduct);
  }

  async update(req, res) {
    const messageService = _tsyringe.container.resolve(_updateCustom.UpdateCustomService);

    const {
      name,
      email
    } = req.body;
    const {
      id
    } = req.params;
    const updateProduct = await messageService.update({
      id,
      name,
      email
    });
    return res.json(updateProduct);
  }

  async delete(req, res) {
    const messageService = _tsyringe.container.resolve(_deleteCustom.DeleteCustomService);

    const {
      id
    } = req.params;
    await messageService.delete(id);
    return res.status(200).json({
      message: 'custom removed successfully'
    });
  }

}

exports.CustomControllers = CustomControllers;