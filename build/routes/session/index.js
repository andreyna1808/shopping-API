"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.session = void 0;

var _express = require("express");

var _sessionsControllers = require("../../controllers/sessionsControllers");

var _sessions = require("../../utils/validations/sessions");

const sessionController = new _sessionsControllers.SessionsControllers();
const session = (0, _express.Router)();
exports.session = session;
session.post('/', _sessions.validationPost, sessionController.createSession);