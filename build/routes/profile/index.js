"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.profile = void 0;

var _express = require("express");

var _profileControllers = require("../../controllers/profileControllers");

var _isAuth = _interopRequireDefault(require("../../middlewares/isAuth"));

var _validation = require("./validation");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const profileController = new _profileControllers.ProfileControllers();
const profile = (0, _express.Router)();
exports.profile = profile;
profile.get('/', _isAuth.default, profileController.listUser);
profile.put('/', _isAuth.default, _validation.validationProfile, profileController.updateUser);