"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SendForgotPasswordService = void 0;

var _path = _interopRequireDefault(require("path"));

var _tsyringe = require("tsyringe");

var _mail = _interopRequireDefault(require("../../config/mail"));

var _IUsers = require("../../interface/IUsers");

var _IUserToken = require("../../interface/IUserToken");

var _appError = require("../../utils/appError");

var _dec, _dec2, _dec3, _dec4, _dec5, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let SendForgotPasswordService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('UsersRepository')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('UserTokensRepository')(target, undefined, 1);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _IUsers.IUsersRepository === "undefined" ? Object : _IUsers.IUsersRepository, typeof _IUserToken.IUserTokensRepository === "undefined" ? Object : _IUserToken.IUserTokensRepository]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = class SendForgotPasswordService {
  constructor(usersRepository, userTokensRepository) {
    this.usersRepository = usersRepository;
    this.userTokensRepository = userTokensRepository;
  }

  async forgotPassword(email) {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new _appError.AppError('User not found', 404);
    }

    const forgotPassword = await this.userTokensRepository.generate(user.id);

    const forgotPasswordTemplate = _path.default.resolve(__dirname, '..', '..', 'views', 'forgot.hbs');

    await _mail.default.sendMail({
      to: {
        name: user.name,
        email: user.email
      },
      subject: '[API VENDAS] Recuperação de Senha',
      templateData: {
        file: forgotPasswordTemplate,
        variables: {
          name: user.name,
          token: forgotPassword === null || forgotPassword === void 0 ? void 0 : forgotPassword.token,
          link: `${process.env.APP_WEB_URL}/reset_password?token=${forgotPassword.token}`
        }
      }
    });
    return forgotPassword;
  }

}) || _class) || _class) || _class) || _class) || _class);
exports.SendForgotPasswordService = SendForgotPasswordService;