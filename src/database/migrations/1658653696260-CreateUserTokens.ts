import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateUserTokens1658653696260 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'tokens',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'token',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'user_id', // Será um chave estrangeira
            type: 'uuid',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
        foreignKeys: [
          {
            name: 'tokenUser', // nome da foreign key
            referencedTableName: 'users', // Nome da tabela que receberá a chave primária (estrangeira)
            referencedColumnNames: ['id'], // Nome da coluna que irá referenciar, enviar o id para a outra coluna (estrangeira)
            columnNames: ['user_id'], // Nome da coluna que vai receber a Coluna da outra tabela
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('tokens');
  }
}
