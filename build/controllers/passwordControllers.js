"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PasswordControllers = void 0;

var _tsyringe = require("tsyringe");

var _resetPassword = require("../services/password/resetPassword");

var _SendForgotPassword = require("../services/password/SendForgotPassword");

class PasswordControllers {
  async forgotPassword(req, res) {
    const forgotPasswordSession = _tsyringe.container.resolve(_SendForgotPassword.SendForgotPasswordService);

    const {
      email
    } = req.body;
    const dataUserToken = await forgotPasswordSession.forgotPassword(email);
    return res.status(200).json(dataUserToken);
  }

  async resetPassword(req, res) {
    const createSessionService = _tsyringe.container.resolve(_resetPassword.ResetPasswordService);

    const {
      token,
      password
    } = req.body;
    const resetPassword = await createSessionService.resetPassword({
      token,
      password
    });
    return res.status(200).json(resetPassword);
  }

}

exports.PasswordControllers = PasswordControllers;