import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { CandidateModule } from './candidate/candidate.module';
import { MinioModule } from './minio/minio.module';
import { UserModule } from './users/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MinioModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        URL: configService.get('MINIO_URL'),
        PORT: configService.get('MINIO_PORT'),
        MINIO_ACCESS_KEY: configService.get(
          'MINIO_ACCESS_KEY',
          'DEV_ACCESS_KEY',
        ),
        MINIO_SECRET_KEY: configService.get(
          'MINIO_SECRET_KEY',
          'DEV_SECRET_KEY',
        ),
      }),
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST', 'localhost'),
        port: configService.get('DB_PORT', 5432),
        username: configService.get('DB_USERNAME', 'job_user'),
        password: configService.get('DB_PASSWORD', '12345678'),
        database: configService.get('DB_DATABASE', 'job'),
        migrations: [__dirname + '/migrations/*{.ts,.js}'],
        migrationsRun: true,
        autoLoadEntities: true,
      }),
    }),
    AuthModule,
    UserModule,
    CandidateModule,
  ],
})
export class AppModule {}
