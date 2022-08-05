import { MigrationInterface, QueryRunner } from "typeorm";

export class CandidateContactDataColumns1659697631498 implements MigrationInterface {
    name = 'CandidateContactDataColumns1659697631498'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "candidates" DROP COLUMN "resume"`);
        await queryRunner.query(`ALTER TABLE "candidates" ADD "contactDataPhone" character varying`);
        await queryRunner.query(`ALTER TABLE "candidates" ADD "contactDataEmail" character varying`);
        await queryRunner.query(`ALTER TABLE "candidates" ADD "contactDataSkype" character varying`);
        await queryRunner.query(`ALTER TABLE "candidates" ADD "contactDataCvFilepath" character varying`);
        await queryRunner.query(`ALTER TABLE "candidates" ADD "contactDataCvFilename" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "candidates" DROP COLUMN "contactDataCvFilename"`);
        await queryRunner.query(`ALTER TABLE "candidates" DROP COLUMN "contactDataCvFilepath"`);
        await queryRunner.query(`ALTER TABLE "candidates" DROP COLUMN "contactDataSkype"`);
        await queryRunner.query(`ALTER TABLE "candidates" DROP COLUMN "contactDataEmail"`);
        await queryRunner.query(`ALTER TABLE "candidates" DROP COLUMN "contactDataPhone"`);
        await queryRunner.query(`ALTER TABLE "candidates" ADD "resume" character varying`);
    }

}
