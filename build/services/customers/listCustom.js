"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListCustomerService = void 0;

var _tsyringe = require("tsyringe");

var _ICustomer = require("../../interface/ICustomer");

var _appError = require("../../utils/appError");

var _dec, _dec2, _dec3, _dec4, _class;

let ListCustomerService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('CustomersRepository')(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _ICustomer.ICustomersRepository === "undefined" ? Object : _ICustomer.ICustomersRepository]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class ListCustomerService {
  constructor(customersRepository) {
    this.customersRepository = customersRepository;
  }

  async list({
    page,
    limit
  }) {
    const take = limit;
    const skip = (Number(page) - 1) * take;
    const listCustom = await this.customersRepository.findAll({
      page,
      skip,
      take
    });
    return listCustom;
  }

  async listById(id) {
    const listCustom = await this.customersRepository.findById(id);

    if (!listCustom) {
      throw new _appError.AppError('User not found', 404);
    }

    return listCustom;
  }

}) || _class) || _class) || _class) || _class);
exports.ListCustomerService = ListCustomerService;