import { DataSource } from 'typeorm';

const config = new DataSource({
  "type": "postgres",
  "host": "localhost",
  "port": 5432,
  "username": "job_user",
  "password": "12345678",
  "database": "job",
  "entities": ["/**/*.entity{.ts,.js}"],
  "synchronize": false,
  "migrations": ["./migrations/*.ts"],
  "migrationsTableName": "migrations_typeorm",
  "migrationsRun": true
});

export default config;
