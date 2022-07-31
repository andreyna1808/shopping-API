"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.authConfig = void 0;
const authConfig = {
  jwt: process.env.APP_SECRET,
  dateExpires: '1d'
};
exports.authConfig = authConfig;