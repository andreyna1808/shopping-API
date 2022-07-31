"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AddOrderIdToOrdersProducts1658690093879 = void 0;

var _typeorm = require("typeorm");

class AddOrderIdToOrdersProducts1658690093879 {
  async up(queryRunner) {
    await queryRunner.addColumn('order_products', new _typeorm.TableColumn({
      name: 'order_id',
      type: 'uuid',
      isNullable: true
    }));
    await queryRunner.createForeignKey('order_products', new _typeorm.TableForeignKey({
      name: 'OrdersProducts',
      columnNames: ['order_id'],
      referencedTableName: 'orders',
      referencedColumnNames: ['id'],
      onDelete: 'SET NULL'
    }));
  }

  async down(queryRunner) {
    await queryRunner.dropForeignKey('order_products', 'OrdersProducts');
    await queryRunner.dropColumn('order_products', 'order_id');
  }

}

exports.AddOrderIdToOrdersProducts1658690093879 = AddOrderIdToOrdersProducts1658690093879;