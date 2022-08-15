import { Inject, Injectable } from '@nestjs/common';
import { MinioModuleOptions } from './minio.module';
import { Client } from 'minio';
import { MINIO_CONFIG_OPTIONS } from './minio.constants';

@Injectable()
export class MinioService {
  minioClient: Client;

  constructor(
    @Inject(MINIO_CONFIG_OPTIONS)
    readonly options: MinioModuleOptions,
  ) {
    this.minioClient = new Client({
      endPoint: options.URL || 'localhost',
      port: options.PORT || 9000,
      useSSL: false,
      accessKey: options.MINIO_ACCESS_KEY,
      secretKey: options.MINIO_SECRET_KEY,
    });
  }

  async saveBufferFile(bucket: string, fileName: string, buffer: Buffer) {
    await this.minioClient.putObject(bucket, fileName, buffer);
  }

  async getFile(bucket: string, fileName: string) {
    return this.minioClient.getObject(bucket, fileName);
  }
}
