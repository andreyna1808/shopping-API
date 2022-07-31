"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ShowProfileService = void 0;

var _tsyringe = require("tsyringe");

var _IUsers = require("../../interface/IUsers");

var _appError = require("../../utils/appError");

var _dec, _dec2, _dec3, _dec4, _class;

let ShowProfileService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('UsersRepository')(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _IUsers.IUsersRepository === "undefined" ? Object : _IUsers.IUsersRepository]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class ShowProfileService {
  constructor(usersRepository) {
    this.usersRepository = usersRepository;
  }

  async showProfile(id) {
    const usersExists = await this.usersRepository.findById(id);

    if (!usersExists) {
      throw new _appError.AppError('User not found', 404);
    }

    return usersExists;
  }

}) || _class) || _class) || _class) || _class);
exports.ShowProfileService = ShowProfileService;