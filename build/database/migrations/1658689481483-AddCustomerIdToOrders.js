"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AddCustomerIdToOrders1658689481483 = void 0;

var _typeorm = require("typeorm");

class AddCustomerIdToOrders1658689481483 {
  async up(queryRunner) {
    await queryRunner.addColumn('orders', new _typeorm.TableColumn({
      name: 'customer_id',
      type: 'uuid',
      isNullable: true
    }));
    await queryRunner.createForeignKey('orders', new _typeorm.TableForeignKey({
      name: 'OrdersCustomer',
      columnNames: ['customer_id'],
      referencedTableName: 'customers',
      referencedColumnNames: ['id'],
      onDelete: 'SET NULL'
    }));
  }

  async down(queryRunner) {
    await queryRunner.dropForeignKey('orders', 'OrdersCustomer');
    await queryRunner.dropColumn('orders', 'customer_id');
  }

}

exports.AddCustomerIdToOrders1658689481483 = AddCustomerIdToOrders1658689481483;