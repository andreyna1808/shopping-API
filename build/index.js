"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.app = void 0;

require("reflect-metadata");

require("dotenv/config");

require("./container");

var _celebrate = require("celebrate");

var _cors = _interopRequireDefault(require("cors"));

var _express = _interopRequireDefault(require("express"));

var _typeormPagination = require("typeorm-pagination");

require("./database");

require("express-async-errors");

var _routes = require("./routes");

var _appError = require("./utils/appError");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable @typescript-eslint/no-unused-vars */
const app = (0, _express.default)();
exports.app = app;
app.use((0, _cors.default)());
app.use(_express.default.json());
app.use(_typeormPagination.pagination);
app.use('/api/v1/', _routes.routes);
app.use((0, _celebrate.errors)());
app.use((err, req, res, next) => {
  if (err instanceof _appError.AppError) {
    return res.status(err.statusCode).json(err.message);
  }

  return res.status(500).json({
    message: 'Internal server error',
    more: err.message
  });
});