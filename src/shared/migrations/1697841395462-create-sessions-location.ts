import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateSessionsLocation1697841395462 implements MigrationInterface {
    name = 'CreateSessionsLocation1697841395462'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "session_location" ("id" SERIAL NOT NULL, "lat" character varying NOT NULL, "long" character varying NOT NULL, "success" boolean NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, CONSTRAINT "PK_beace472d7da4b379d8a7b08b32" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "session_location" ADD CONSTRAINT "FK_1d227f67102df69ad0a8d4923df" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "session_location" DROP CONSTRAINT "FK_1d227f67102df69ad0a8d4923df"`);
        await queryRunner.query(`DROP TABLE "session_location"`);
    }

}
