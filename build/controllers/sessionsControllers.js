"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SessionsControllers = void 0;

var _classTransformer = require("class-transformer");

var _tsyringe = require("tsyringe");

var _createSession = require("../services/sessions/createSession");

class SessionsControllers {
  async createSession(req, res) {
    const createSessionService = _tsyringe.container.resolve(_createSession.CreateSessionService);

    const {
      email,
      password
    } = req.body;
    const createSession = await createSessionService.createSession({
      email,
      password
    });
    return res.status(201).json((0, _classTransformer.instanceToInstance)(createSession));
  }

}

exports.SessionsControllers = SessionsControllers;