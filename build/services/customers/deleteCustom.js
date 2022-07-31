"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DeleteCustomService = void 0;

var _tsyringe = require("tsyringe");

var _ICustomer = require("../../interface/ICustomer");

var _appError = require("../../utils/appError");

var _dec, _dec2, _dec3, _dec4, _class;

let DeleteCustomService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('CustomersRepository')(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _ICustomer.ICustomersRepository === "undefined" ? Object : _ICustomer.ICustomersRepository]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class DeleteCustomService {
  constructor(customersRepository) {
    this.customersRepository = customersRepository;
  }

  async delete(id) {
    const removeCustom = await this.customersRepository.findById(id);

    if (!removeCustom) {
      throw new _appError.AppError('User not found', 404);
    }

    await this.customersRepository.remove(removeCustom);
  }

}) || _class) || _class) || _class) || _class);
exports.DeleteCustomService = DeleteCustomService;