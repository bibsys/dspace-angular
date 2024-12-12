import { NgModule } from '@angular/core';
import { AccessConditionsComponent } from './app/shared/access-conditions/access-conditions.component';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../app/shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    CommonModule,
  ],
  declarations: [
    AccessConditionsComponent,
  ],
  exports: [
    AccessConditionsComponent,
  ]
})
export class SharedThemeModule { }
