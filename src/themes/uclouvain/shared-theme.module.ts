import { NgModule } from '@angular/core';
import { AccessConditionsComponent } from './app/shared/access-conditions/access-condition.component';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../app/shared/shared.module';
import { ContextMenuThemeModule } from './app/shared/context-menu/context-menu-theme.module';

@NgModule({
  imports: [
    SharedModule,
    CommonModule,
    ContextMenuThemeModule,
  ],
  declarations: [
    AccessConditionsComponent,
  ],
  exports: [
    AccessConditionsComponent
  ]
})
export class SharedThemeModule { }
