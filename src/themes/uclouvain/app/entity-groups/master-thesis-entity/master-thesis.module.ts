import { NgModule } from '@angular/core';
import { MasterThesisPageComponent } from './item-pages/master-thesis-page.component';
import { SharedModule } from '../../../../../app/shared/shared.module';
import { ResultsBackButtonModule } from '../../../../../app/shared/results-back-button/results-back-button.module';
import { ContextMenuModule } from '../../../../../app/shared/context-menu/context-menu.module';
import { ItemPageModule } from '../../../../../app/item-page/item-page.module';
import { ItemSharedModule } from '../../../../../app/item-page/item-shared.module';
import { ItemPageTagFieldsComponent } from '../../item-page/simple/field-components/specific-field/tags/item-page-tag-fields.component';
import { ItemPageTitleFieldComponent } from '../../item-page/simple/field-components/specific-field/title/item-page-title-field.component';
import { ItemPageListFieldsComponent } from '../../item-page/simple/field-components/specific-field/list/item-page-list-fields.component';
import { MasterThesisListElementComponent } from './item-list-elements/master-thesis-list-element.component';
import { MasterThesisSearchResultListElementComponent } from './search-result-list-elements/master-thesis-search-result-list-element.component';
import { MasterThesisFacultyBadgesComponent } from './item-widgets/master-thesis-faculty-badges.component';
import { SharedThemeModule } from '../../../shared-theme.module';

const ENTRY_COMPONENTS = [];

const DECLARATIONS = [
  ...ENTRY_COMPONENTS,
  ItemPageTitleFieldComponent,
  ItemPageTagFieldsComponent,
  ItemPageListFieldsComponent,
  MasterThesisPageComponent,
  MasterThesisListElementComponent,
  MasterThesisSearchResultListElementComponent,
  MasterThesisFacultyBadgesComponent
];

@NgModule({
  imports: [
    SharedModule,
    ResultsBackButtonModule,
    ContextMenuModule,
    ItemPageModule,
    ItemSharedModule,
    SharedThemeModule
  ],
  declarations: DECLARATIONS,
  providers: [
    ...ENTRY_COMPONENTS.map((component) => ({provide: component}))
  ],
})
export class MasterThesisModule {
}