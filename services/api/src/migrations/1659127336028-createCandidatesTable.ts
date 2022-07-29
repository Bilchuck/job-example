import { MigrationInterface, QueryRunner } from 'typeorm';

export class createCandidatesTable1659127336028 implements MigrationInterface {
  name = 'createCandidatesTable1659127336028';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "candidates" ("id" SERIAL NOT NULL, "title" character varying, "salary" integer, "resume" character varying, "category" character varying, "description" character varying, "experienceYears" integer, "country" character varying, "city" character varying, "skills" json, "registrationStepsFinished" boolean NOT NULL, "userId" integer, CONSTRAINT "REL_10d0384a816526f8c7f6b1e67b" UNIQUE ("userId"), CONSTRAINT "PK_140681296bf033ab1eb95288abb" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "candidates" ADD CONSTRAINT "FK_10d0384a816526f8c7f6b1e67b3" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "candidates" DROP CONSTRAINT "FK_10d0384a816526f8c7f6b1e67b3"`,
    );
    await queryRunner.query(`DROP TABLE "candidates"`);
  }
}
