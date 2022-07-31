"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

var _customersEntitie = _interopRequireDefault(require("../entities/customersEntitie"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class CustomRepository {
  constructor() {
    _defineProperty(this, "ormRepository", void 0);

    this.ormRepository = (0, _typeorm.getRepository)(_customersEntitie.default);
  }

  async create({
    name,
    email
  }) {
    const customer = this.ormRepository.create({
      name,
      email
    });
    await this.ormRepository.save(customer);
    return customer;
  }

  async save(customer) {
    await this.ormRepository.save(customer);
    return customer;
  }

  async remove(customer) {
    await this.ormRepository.remove(customer);
  }

  async findAll({
    page,
    skip,
    take
  }) {
    const [customers, count] = await this.ormRepository.createQueryBuilder().skip(skip).take(take).getManyAndCount();
    const result = {
      per_page: take,
      total: count,
      current_page: page,
      data: customers
    };
    return result;
  }

  async findByName(name) {
    const customer = await this.ormRepository.findOne({
      name
    });
    return customer;
  }

  async findById(id) {
    const customer = await this.ormRepository.findOne({
      id
    });
    return customer;
  }

  async findByEmail(email) {
    const customer = await this.ormRepository.findOne({
      email
    });
    return customer;
  }

}

var _default = CustomRepository;
exports.default = _default;