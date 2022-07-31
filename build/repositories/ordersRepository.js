"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

var _orderEntitie = _interopRequireDefault(require("../entities/orderEntitie"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class OrdersRepository {
  constructor() {
    _defineProperty(this, "ormRepository", void 0);

    this.ormRepository = (0, _typeorm.getRepository)(_orderEntitie.default);
  }

  async findById(id) {
    const order = this.ormRepository.findOne({
      where: {
        id
      },
      relations: ['order_products', 'customer']
    });
    return order;
  }

  async findAll({
    page,
    skip,
    take
  }) {
    const [orders, count] = await this.ormRepository.createQueryBuilder().skip(skip).take(take).getManyAndCount();
    const result = {
      per_page: take,
      total: count,
      current_page: page,
      data: orders
    };
    return result;
  }

  async create({
    customer,
    products
  }) {
    const order = this.ormRepository.create({
      customer,
      order_products: products
    });
    await this.ormRepository.save(order);
    return order;
  }

}

var _default = OrdersRepository;
exports.default = _default;