"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _handlebars = _interopRequireDefault(require("handlebars"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class HandlebardMailTemplate {
  async parse({
    file,
    variables
  }) {
    const templateFile = await _fs.default.promises.readFile(file, {
      encoding: 'utf-8'
    }); // Vai ler uma formatação de html

    const parseTemplate = _handlebars.default.compile(templateFile);

    return parseTemplate(variables);
  }

}

exports.default = HandlebardMailTemplate;