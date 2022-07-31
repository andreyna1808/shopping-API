"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.users = void 0;

var _express = require("express");

var _usersControllers = require("../../controllers/usersControllers");

var _isAuth = _interopRequireDefault(require("../../middlewares/isAuth"));

var _upload = require("../../utils/upload");

var _users = require("../../utils/validations/users");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const usersController = new _usersControllers.UsersControllers();
const users = (0, _express.Router)();
exports.users = users;
users.get('/', _isAuth.default, usersController.list);
users.get('/:id', _users.validationGetById, usersController.listById);
users.post('/', _users.validationPost, usersController.create);
users.put('/:id', _users.validationPut, usersController.update);
users.delete('/:id', _users.validationDelete, usersController.delete);
users.patch('/avatar', _isAuth.default, _upload.UploadUtils.single('avatar'), usersController.UpdateAvatar);