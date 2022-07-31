"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ResetPasswordService = void 0;

var _bcryptjs = require("bcryptjs");

var _dateFns = require("date-fns");

var _tsyringe = require("tsyringe");

var _IUsers = require("../../interface/IUsers");

var _IUserToken = require("../../interface/IUserToken");

var _appError = require("../../utils/appError");

var _dec, _dec2, _dec3, _dec4, _dec5, _class;

let ResetPasswordService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('UsersRepository')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('UserTokensRepository')(target, undefined, 1);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _IUsers.IUsersRepository === "undefined" ? Object : _IUsers.IUsersRepository, typeof _IUserToken.IUserTokensRepository === "undefined" ? Object : _IUserToken.IUserTokensRepository]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = class ResetPasswordService {
  constructor(usersRepository, userTokensRepository) {
    this.usersRepository = usersRepository;
    this.userTokensRepository = userTokensRepository;
  }

  async resetPassword({
    token,
    password
  }) {
    const userToken = await this.userTokensRepository.findByToken(token);

    if (!userToken) {
      throw new _appError.AppError('User not found', 404);
    }

    const userId = userToken.user_id;
    const user = await await this.usersRepository.findById(userId);

    if (!user) {
      throw new _appError.AppError('User not found', 404);
    }

    const tokenCreatedAt = userToken.created_at;
    const compareDate = (0, _dateFns.addHours)(tokenCreatedAt, 2);

    if ((0, _dateFns.isAfter)(Date.now(), compareDate)) {
      throw new _appError.AppError('Token expired', 498);
    }

    user.password = await (0, _bcryptjs.hash)(password, 8);
    const saveResetPassword = await this.usersRepository.save(user);
    return saveResetPassword;
  }

}) || _class) || _class) || _class) || _class) || _class);
exports.ResetPasswordService = ResetPasswordService;