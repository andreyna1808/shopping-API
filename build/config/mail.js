"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _nodemailer = _interopRequireDefault(require("nodemailer"));

var _mailTemplate = _interopRequireDefault(require("./templates/mailTemplate"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class EtherealMail {
  static async sendMail({
    to,
    from,
    subject,
    templateData
  }) {
    const account = await _nodemailer.default.createTestAccount();
    const mailTemplate = new _mailTemplate.default();

    const transporter = _nodemailer.default.createTransport({
      host: account.smtp.host,
      port: account.smtp.port,
      secure: account.smtp.secure,
      auth: {
        user: account.user,
        pass: account.pass
      }
    });

    const message = await transporter.sendMail({
      from: {
        name: (from === null || from === void 0 ? void 0 : from.name) || 'Drica vendas',
        address: (from === null || from === void 0 ? void 0 : from.email) || `andreynaVendas@apidricavendas.com`
      },
      to: {
        name: (to === null || to === void 0 ? void 0 : to.name) || 'Anônimo',
        address: to.email
      },
      subject,
      html: await mailTemplate.parse(templateData)
    });
    console.log('Id message', message.messageId);
    console.log('Id url mail', _nodemailer.default.getTestMessageUrl(message));
  }

}

exports.default = EtherealMail;