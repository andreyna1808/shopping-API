"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DeleteProductsService = void 0;

var _tsyringe = require("tsyringe");

var _IProducts = require("../../interface/IProducts/IProducts");

var _appError = require("../../utils/appError");

var _dec, _dec2, _dec3, _dec4, _class;

let DeleteProductsService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('ProductsRepository')(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _IProducts.IProductsRepository === "undefined" ? Object : _IProducts.IProductsRepository]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class DeleteProductsService {
  constructor(productsRepository) {
    this.productsRepository = productsRepository;
  }

  async delete(id) {
    const product = await this.productsRepository.findById(id);

    if (!product) {
      throw new _appError.AppError('Product not found.');
    }

    await this.productsRepository.remove(product);
  }

}) || _class) || _class) || _class) || _class);
exports.DeleteProductsService = DeleteProductsService;