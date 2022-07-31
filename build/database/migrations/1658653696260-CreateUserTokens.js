"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateUserTokens1658653696260 = void 0;

var _typeorm = require("typeorm");

class CreateUserTokens1658653696260 {
  async up(queryRunner) {
    await queryRunner.createTable(new _typeorm.Table({
      name: 'tokens',
      columns: [{
        name: 'id',
        type: 'uuid',
        isPrimary: true
      }, {
        name: 'token',
        type: 'uuid',
        isNullable: true
      }, {
        name: 'user_id',
        type: 'uuid'
      }, {
        name: 'created_at',
        type: 'timestamp',
        default: 'now()'
      }, {
        name: 'updated_at',
        type: 'timestamp',
        default: 'now()'
      }],
      foreignKeys: [{
        name: 'tokenUser',
        referencedTableName: 'users',
        referencedColumnNames: ['id'],
        columnNames: ['user_id'],
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      }]
    }));
  }

  async down(queryRunner) {
    await queryRunner.dropTable('tokens');
  }

}

exports.CreateUserTokens1658653696260 = CreateUserTokens1658653696260;