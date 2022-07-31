"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UpdateUserAvatarService = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _tsyringe = require("tsyringe");

var _upload = require("../../config/upload");

var _IUsers = require("../../interface/IUsers");

var _appError = require("../../utils/appError");

var _dec, _dec2, _dec3, _dec4, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let UpdateUserAvatarService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('UsersRepository')(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _IUsers.IUsersRepository === "undefined" ? Object : _IUsers.IUsersRepository]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class UpdateUserAvatarService {
  constructor(usersRepository) {
    this.usersRepository = usersRepository;
  }

  async updateAvatar({
    id,
    avatar
  }) {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new _appError.AppError('User not found', 404);
    }

    if (user.avatar) {
      const userAvatarFilePath = _path.default.join(_upload.Upload.directory, user.avatar);

      const userAvatarExists = await _fs.default.promises.stat(userAvatarFilePath);

      if (userAvatarExists) {
        await _fs.default.promises.unlink(userAvatarFilePath);
      }
    }

    user.avatar = avatar;
    await this.usersRepository.save(user);
    return user;
  }

}) || _class) || _class) || _class) || _class);
exports.UpdateUserAvatarService = UpdateUserAvatarService;