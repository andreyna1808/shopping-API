"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

var _usersEntitie = _interopRequireDefault(require("../entities/usersEntitie"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class UsersRepository {
  constructor() {
    _defineProperty(this, "ormRepository", void 0);

    this.ormRepository = (0, _typeorm.getRepository)(_usersEntitie.default);
  }

  async create({
    name,
    email,
    password
  }) {
    const user = this.ormRepository.create({
      name,
      email,
      password
    });
    await this.ormRepository.save(user);
    return user;
  }

  async save(user) {
    await this.ormRepository.save(user);
    return user;
  }

  async remove(user) {
    await this.ormRepository.remove(user);
  }

  async findAll({
    page,
    skip,
    take
  }) {
    const [users, count] = await this.ormRepository.createQueryBuilder().skip(skip).take(take).getManyAndCount();
    const result = {
      per_page: take,
      total: count,
      current_page: page,
      data: users
    };
    return result;
  }

  async findByName(name) {
    const user = await this.ormRepository.findOne({
      name
    });
    return user;
  }

  async findById(id) {
    const user = await this.ormRepository.findOne({
      id
    });
    return user;
  }

  async findByEmail(email) {
    const user = await this.ormRepository.findOne({
      email
    });
    return user;
  }

}

var _default = UsersRepository;
exports.default = _default;