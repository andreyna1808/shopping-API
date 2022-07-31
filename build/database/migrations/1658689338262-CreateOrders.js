"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateOrders1658689338262 = void 0;

var _typeorm = require("typeorm");

class CreateOrders1658689338262 {
  async up(queryRunner) {
    await queryRunner.createTable(new _typeorm.Table({
      name: 'orders',
      columns: [{
        name: 'id',
        type: 'uuid',
        isPrimary: true
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
    await queryRunner.dropTable('orders');
  }

}

exports.CreateOrders1658689338262 = CreateOrders1658689338262;