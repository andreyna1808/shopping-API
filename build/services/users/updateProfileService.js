"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UpdateProfileService = void 0;

var _bcryptjs = require("bcryptjs");

var _tsyringe = require("tsyringe");

var _IUsers = require("../../interface/IUsers");

var _appError = require("../../utils/appError");

var _dec, _dec2, _dec3, _dec4, _class;

let UpdateProfileService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('UsersRepository')(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _IUsers.IUsersRepository === "undefined" ? Object : _IUsers.IUsersRepository]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class UpdateProfileService {
  constructor(usersRepository) {
    this.usersRepository = usersRepository;
  }

  async updateProfile({
    user_id,
    name,
    email,
    password,
    old_password
  }) {
    const user = await this.usersRepository.findById(user_id);
    const userUpdate = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new _appError.AppError('User not found', 404);
    }

    if (userUpdate && userUpdate.id !== user_id) {
      throw new _appError.AppError('There is already one user with this email', 409);
    }

    if (password && !old_password) {
      throw new _appError.AppError('Old password is required');
    }

    if (password && old_password) {
      const checkOldPassword = await (0, _bcryptjs.compare)(old_password, user.password);

      if (!checkOldPassword) {
        throw new _appError.AppError('Old password does not correct');
      }

      user.password = await (0, _bcryptjs.hash)(password, 8);
    }

    user.name = name;
    user.email = email;
    const updateProfile = await this.usersRepository.save(user);
    return updateProfile;
  }

}) || _class) || _class) || _class) || _class);
exports.UpdateProfileService = UpdateProfileService;