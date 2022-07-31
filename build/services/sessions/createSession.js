"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateSessionService = void 0;

var _jsonwebtoken = require("jsonwebtoken");

var _tsyringe = require("tsyringe");

var _auth = require("../../config/auth");

var _IHash = require("../../interface/IHash");

var _IUsers = require("../../interface/IUsers");

var _appError = require("../../utils/appError");

var _dec, _dec2, _dec3, _dec4, _dec5, _class;

let CreateSessionService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('UsersRepository')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('HashProvider')(target, undefined, 1);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _IUsers.IUsersRepository === "undefined" ? Object : _IUsers.IUsersRepository, typeof _IHash.IHashProvider === "undefined" ? Object : _IHash.IHashProvider]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = class CreateSessionService {
  constructor(usersRepository, hashProvider) {
    this.usersRepository = usersRepository;
    this.hashProvider = hashProvider;
  }

  async createSession({
    email,
    password
  }) {
    const user = await this.usersRepository.findByEmail(email);
    const confirmedPassword = await this.hashProvider.compareHash(password, user.password);

    if (!user || !confirmedPassword) {
      throw new _appError.AppError('Incorrect email/password', 401);
    }

    const token = (0, _jsonwebtoken.sign)({}, _auth.authConfig.jwt, {
      subject: user.id,
      expiresIn: _auth.authConfig.dateExpires
    });
    return {
      user,
      token
    };
  }

}) || _class) || _class) || _class) || _class) || _class);
exports.CreateSessionService = CreateSessionService;