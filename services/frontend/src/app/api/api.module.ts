import { NgModule } from '@angular/core';
import { ApiService } from './api.service';

@NgModule({
  providers: [ApiService],
  // exports: [ApiService],
})
export class ApiModule {}
