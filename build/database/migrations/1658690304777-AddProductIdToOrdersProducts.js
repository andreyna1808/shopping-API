"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AddProductIdToOrdersProducts1658690304777 = void 0;

var _typeorm = require("typeorm");

class AddProductIdToOrdersProducts1658690304777 {
  async up(queryRunner) {
    await queryRunner.addColumn('order_products', new _typeorm.TableColumn({
      name: 'product_id',
      type: 'uuid',
      isNullable: true
    }));
    await queryRunner.createForeignKey('order_products', new _typeorm.TableForeignKey({
      name: 'OrdersProductsProduct',
      columnNames: ['product_id'],
      referencedTableName: 'products',
      referencedColumnNames: ['id'],
      onDelete: 'SET NULL'
    }));
  }

  async down(queryRunner) {
    await queryRunner.dropForeignKey('order_products', 'OrdersProductsProduct');
    await queryRunner.dropColumn('order_products', 'product_id');
  }

}

exports.AddProductIdToOrdersProducts1658690304777 = AddProductIdToOrdersProducts1658690304777;