import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
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
      }),
    }),
    AuthModule,
  ],
})
export class AppModule {}
