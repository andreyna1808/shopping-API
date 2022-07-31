"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListProductsService = void 0;

var _tsyringe = require("tsyringe");

var _IProducts = require("../../interface/IProducts/IProducts");

var _appError = require("../../utils/appError");

var _dec, _dec2, _dec3, _dec4, _class;

let ListProductsService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('ProductsRepository')(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _IProducts.IProductsRepository === "undefined" ? Object : _IProducts.IProductsRepository]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class ListProductsService {
  constructor(productsRepository) {
    this.productsRepository = productsRepository;
  }

  async list({
    page,
    limit
  }) {
    const take = limit;
    const skip = (Number(page) - 1) * take;
    const products = await this.productsRepository.findAll({
      page,
      skip,
      take
    });
    return products;
  }

  async listById(id) {
    const product = await this.productsRepository.findById(id);

    if (!product) {
      throw new _appError.AppError('Product not found.');
    }

    return product;
  }

}) || _class) || _class) || _class) || _class);
exports.ListProductsService = ListProductsService;