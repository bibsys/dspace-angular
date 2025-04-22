import { NgModule } from '@angular/core';
import { PublicationListElementComponent } from './item-list-elements/publication-list-elements.component';
import { PublicationSearchResultListElementComponent } from './search-result-list-elements/publication-search-result/publication-search-result-list-element.component';
import { SharedThemeModule } from 'src/themes/uclouvain/shared-theme.module';
import { ItemSharedModule } from 'src/app/item-page/item-shared.module';
import { ItemPageModule } from 'src/app/item-page/item-page.module';
import { ContextMenuModule } from 'src/app/shared/context-menu/context-menu.module';
import { ResultsBackButtonModule } from 'src/app/shared/results-back-button/results-back-button.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { AuthorFormatDisplayComponent } from './specific-field/author-format-display.component';
import { PublicationSearchResultWrapperComponent } from './search-result-list-elements/publication-search-result/publicaton-search-result-wrapper.component.html/publication-search-result-wrapper.component';
import { ItemListPreviewComponent } from '../../shared/object-list/my-dspace-result-list-element/item-list-preview/item-list-preview.component';

const ENTRY_COMPONENTS = [];

const DECLARATIONS = [
  ...ENTRY_COMPONENTS,
  PublicationListElementComponent,
  PublicationSearchResultWrapperComponent,
  PublicationSearchResultListElementComponent,
  ItemListPreviewComponent,
  AuthorFormatDisplayComponent,
];

@NgModule({
  imports: [
    SharedModule,
    ResultsBackButtonModule,
    ContextMenuModule,
    ItemPageModule,
    ItemSharedModule,
    SharedThemeModule,
  ],
  declarations: DECLARATIONS,
  providers: [
    ...ENTRY_COMPONENTS.map((component) => ({provide: component}))
  ],
})
export class PublicationModule {
}