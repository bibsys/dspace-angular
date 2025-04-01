import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../app/shared/shared.module';
import { ContextMenuThemeModule } from './app/shared/context-menu/context-menu-theme.module';

@NgModule({
  imports: [
    SharedModule,
    CommonModule,
    ContextMenuThemeModule,
  ]
})
export class SharedThemeModule { }
