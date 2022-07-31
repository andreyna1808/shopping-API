"use strict";

var _tsyringe = require("tsyringe");

var _bcryptHash = _interopRequireDefault(require("../config/bcryptHash"));

var _customersRepository = _interopRequireDefault(require("../repositories/customersRepository"));

var _ordersRepository = _interopRequireDefault(require("../repositories/ordersRepository"));

var _productsRepository = _interopRequireDefault(require("../repositories/productsRepository"));

var _tokenRepository = _interopRequireDefault(require("../repositories/tokenRepository"));

var _usersRepository = _interopRequireDefault(require("../repositories/usersRepository"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_tsyringe.container.registerSingleton('CustomersRepository', _customersRepository.default);

_tsyringe.container.registerSingleton('ProductsRepository', _productsRepository.default);

_tsyringe.container.registerSingleton('OrdersRepository', _ordersRepository.default);

_tsyringe.container.registerSingleton('UsersRepository', _usersRepository.default);

_tsyringe.container.registerSingleton('UserTokensRepository', _tokenRepository.default);

_tsyringe.container.registerSingleton('HashProvider', _bcryptHash.default);