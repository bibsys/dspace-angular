import { NgModule } from '@angular/core';
import { AccessConditionsComponent } from './app/shared/access-conditions/access-condition.component';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../app/shared/shared.module';
import { PromoterFileDownloadUrlComponent } from './app/shared/promoter-download-url/promoter-file-download-url.component';

@NgModule({
  imports: [
    SharedModule,
    CommonModule,
  ],
  declarations: [
    AccessConditionsComponent,
    PromoterFileDownloadUrlComponent
  ],
  exports: [
    AccessConditionsComponent,
    PromoterFileDownloadUrlComponent
  ]
})
export class SharedThemeModule { }
