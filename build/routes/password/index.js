"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.password = void 0;

var _express = require("express");

var _passwordControllers = require("../../controllers/passwordControllers");

var _password = require("../../utils/validations/password");

const passwordController = new _passwordControllers.PasswordControllers();
const password = (0, _express.Router)();
exports.password = password;
password.post('/forgot', passwordController.forgotPassword);
password.post('/reset', _password.validationPassword, passwordController.resetPassword);