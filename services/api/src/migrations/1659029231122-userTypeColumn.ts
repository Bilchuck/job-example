import { MigrationInterface, QueryRunner } from 'typeorm';

export class userTypeColumn1659029231122 implements MigrationInterface {
  name = 'userTypeColumn1659029231122';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" ADD "type" character varying NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "type"`);
  }
}
