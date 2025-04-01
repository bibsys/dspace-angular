import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentItemMenuComponent } from './context-item/comment-item-menu.component';
import { SharedModule } from '../../../../../app/shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    CommonModule,
  ],
  declarations: [
    CommentItemMenuComponent,
  ],
  exports: [
    CommentItemMenuComponent,
  ]
})
export class ContextMenuThemeModule { }
