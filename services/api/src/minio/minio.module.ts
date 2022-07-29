import { DynamicModule, Global, Module, ModuleMetadata, Provider } from '@nestjs/common';
import { MINIO_CONFIG_OPTIONS } from './minio.constants';
import { MinioService } from './minio.service';

export interface MinioModuleOptions {
  global?: boolean;
  URL?: string;
  PORT?: number;
  MINIO_ACCESS_KEY: string;
  MINIO_SECRET_KEY: string;
}
export interface MinioAsyncModuleOptions extends Pick<ModuleMetadata, 'imports'>  {
  inject?: any[];
  useFactory?: (...args: any[]) => Promise<MinioModuleOptions> | MinioModuleOptions;
}

@Global()
@Module({})
export class MinioModule {
  static forRoot(options: MinioModuleOptions): DynamicModule {
    return {
      module: MinioModule,
      global: options.global ?? true,
      providers: [
        {
          provide: MINIO_CONFIG_OPTIONS,
          useValue: options,
        },
        MinioService,
      ],
      exports: [MinioService],
    }
  }

  static forRootAsync(options: MinioAsyncModuleOptions): DynamicModule {
    return {
      module: MinioModule,
      providers: [
        {
          provide: MINIO_CONFIG_OPTIONS,
          useFactory: options.useFactory,
          inject: options.inject,
        },
        MinioService,
      ],
      exports: [MinioService],
    }
  }
}
