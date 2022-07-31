"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateProducts1658358463256 = void 0;

var _typeorm = require("typeorm");

class CreateProducts1658358463256 {
  async up(queryRunner) {
    await queryRunner.createTable(new _typeorm.Table({
      name: 'products',
      columns: [{
        name: 'id',
        type: 'uuid',
        isPrimary: true
      }, {
        name: 'name',
        type: 'varchar'
      }, {
        name: 'price',
        type: 'numeric'
      }, {
        name: 'quantity',
        type: 'numeric'
      }, {
        name: 'created_at',
        type: 'timestamp',
        default: 'now()'
      }, {
        name: 'updated_at',
        type: 'timestamp',
        default: 'now()'
      }]
    }));
  }

  async down(queryRunner) {
    await queryRunner.dropTable('products');
  }

}

exports.CreateProducts1658358463256 = CreateProducts1658358463256;