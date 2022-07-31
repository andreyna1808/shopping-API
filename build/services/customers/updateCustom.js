"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UpdateCustomService = void 0;

var _tsyringe = require("tsyringe");

var _ICustomer = require("../../interface/ICustomer");

var _appError = require("../../utils/appError");

var _dec, _dec2, _dec3, _dec4, _class;

let UpdateCustomService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('CustomersRepository')(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _ICustomer.ICustomersRepository === "undefined" ? Object : _ICustomer.ICustomersRepository]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class UpdateCustomService {
  constructor(customersRepository) {
    this.customersRepository = customersRepository;
  }

  async update({
    id,
    name,
    email
  }) {
    const customExists = await this.customersRepository.findByEmail(email);
    const updateCustom = await this.customersRepository.findById(id);

    if (!updateCustom) {
      throw new _appError.AppError('User not found', 404);
    }

    if (customExists && email !== updateCustom.email) {
      throw new _appError.AppError('There is already one product with this email', 409);
    }

    updateCustom.name = name;
    updateCustom.email = email;
    await this.customersRepository.save(updateCustom);
    return updateCustom;
  }

}) || _class) || _class) || _class) || _class);
exports.UpdateCustomService = UpdateCustomService;