import { NgModule } from '@angular/core';
import { AccessConditionsComponent } from './app/shared/access-conditions/access-conditions.component';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../app/shared/shared.module';
import { CustomTypeBadgeComponent } from './app/entity-groups/publication-entity/search-result-list-elements/custom-type-badge/custom-type-badge.component';
import { ItemLinkViewComponent } from './app/shared/item-link-view/item-link-view.component';

@NgModule({
  imports: [
    SharedModule,
    CommonModule
  ],
  declarations: [
    AccessConditionsComponent,
    CustomTypeBadgeComponent,
    ItemLinkViewComponent,
  ],
  exports: [
    AccessConditionsComponent,
    CustomTypeBadgeComponent,
    ItemLinkViewComponent,
  ]
})
export class SharedThemeModule { }
