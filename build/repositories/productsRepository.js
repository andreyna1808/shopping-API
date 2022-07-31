"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

var _productsEntitie = _interopRequireDefault(require("../entities/productsEntitie"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class ProductsRepository {
  constructor() {
    _defineProperty(this, "ormRepository", void 0);

    this.ormRepository = (0, _typeorm.getRepository)(_productsEntitie.default);
  }

  async create({
    name,
    price,
    quantity
  }) {
    const product = this.ormRepository.create({
      name,
      price,
      quantity
    });
    await this.ormRepository.save(product);
    return product;
  }

  async save(product) {
    await this.ormRepository.save(product);
    return product;
  }

  async remove(product) {
    await this.ormRepository.remove(product);
  }

  async updateStock(products) {
    await this.ormRepository.save(products);
  }

  async findByName(name) {
    const product = this.ormRepository.findOne({
      name
    });
    return product;
  }

  async findById(id) {
    const product = this.ormRepository.findOne({
      id
    });
    return product;
  }

  async findAll({
    page,
    skip,
    take
  }) {
    const [products, count] = await this.ormRepository.createQueryBuilder().skip(skip).take(take).getManyAndCount();
    const result = {
      per_page: take,
      total: count,
      current_page: page,
      data: products
    };
    return result;
  }

  async findAllByIds(products) {
    const productIds = products.map(product => product.id);
    const existentProducts = await this.ormRepository.find({
      where: {
        id: (0, _typeorm.In)(productIds)
      }
    });
    return existentProducts;
  }

}

var _default = ProductsRepository;
exports.default = _default;