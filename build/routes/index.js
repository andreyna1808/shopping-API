"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.routes = void 0;

var _express = require("express");

var _swaggerUiExpress = _interopRequireDefault(require("swagger-ui-express"));

var _swagger = _interopRequireDefault(require("../swagger.json"));

var _customers = require("./customers");

var _order = require("./order");

var _password = require("./password");

var _products = require("./products");

var _profile = require("./profile");

var _session = require("./session");

var _users = require("./users");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const routes = (0, _express.Router)();
exports.routes = routes;
routes.get('/', (req, res) => {
  res.json('Hello Dev');
});
routes.use('/products', _products.products);
routes.use('/users', _users.users);
routes.use('/sessions', _session.session);
routes.use('/password', _password.password);
routes.use('/profile', _profile.profile);
routes.use('/custom', _customers.custom);
routes.use('/orders', _order.orders);
routes.use('/api-docs', _swaggerUiExpress.default.serve, _swaggerUiExpress.default.setup(_swagger.default));