"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Upload = void 0;

var _crypto = _interopRequireDefault(require("crypto"));

var _multer = _interopRequireDefault(require("multer"));

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const uploadFolder = _path.default.resolve(__dirname, '..', 'uploads');

const Upload = {
  directory: uploadFolder,
  storage: _multer.default.diskStorage({
    destination: uploadFolder,

    filename(req, file, callback) {
      const fileHash = _crypto.default.randomBytes(10).toString('hex');

      const filename = `${fileHash}-${file.originalname}`;
      callback(null, filename);
    }

  })
};
exports.Upload = Upload;