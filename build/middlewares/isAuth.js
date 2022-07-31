"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = IsAuth;

var _jsonwebtoken = require("jsonwebtoken");

var _auth = require("../config/auth");

var _appError = require("../utils/appError");

/* eslint-disable @typescript-eslint/no-unused-vars */
function IsAuth(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new _appError.AppError('JWT Token is missing');
  }

  const [bearer, token] = authHeader.split(' ');

  try {
    const decodedToken = (0, _jsonwebtoken.verify)(token, _auth.authConfig.jwt);
    const {
      sub
    } = decodedToken;
    req.user = {
      id: sub
    };
    return next();
  } catch (error) {
    throw new _appError.AppError('Invalid JWT Token');
  }
}