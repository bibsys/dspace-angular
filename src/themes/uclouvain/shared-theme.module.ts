import { NgModule } from '@angular/core';
import { AccessConditionsComponent } from './app/shared/access-conditions/access-condition.component';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../app/shared/shared.module';
import { PromoterFileDownloadUrlComponent } from './app/shared/promoter-download-url/promoter-file-download-url.component';
import { MyDSpaceMasterThesisListElementComponent } from './app/shared/object-list/my-dspace-result-list-element/my-dspace-master-thesis-list-element/my-dspace-master-thesis-list-element.component';

@NgModule({
  imports: [
    SharedModule,
    CommonModule,
  ],
  declarations: [
    AccessConditionsComponent,
    PromoterFileDownloadUrlComponent,
    MyDSpaceMasterThesisListElementComponent
  ],
  exports: [
    AccessConditionsComponent,
    PromoterFileDownloadUrlComponent,
    MyDSpaceMasterThesisListElementComponent
  ]
})
export class SharedThemeModule { }
