"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UploadUtils = void 0;

var _multer = _interopRequireDefault(require("multer"));

var _upload = require("../config/upload");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const UploadUtils = (0, _multer.default)(_upload.Upload);
exports.UploadUtils = UploadUtils;