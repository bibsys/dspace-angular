import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RootModule } from '../../app/root.module';
import { FooterComponent } from './app/footer/footer.component';
import { HeaderNavbarWrapperComponent } from './app/header-nav-wrapper/header-navbar-wrapper.component';
import { HomeNewsComponent } from './app/home-page/home-news/home-news.component';
import { NavbarComponent } from './app/navbar/navbar.component';
import { AuthorInlineLabeledGroupContentComponent } from './app/shared/form/builder/models/authors/authors-inline-labeled-group-content.component';
import { OrgUnitInlineLabeledGroupContentComponent } from './app/shared/form/builder/models/org-unit/org-unit-inline-labeled-group-content.component';
import { ItemPageAffiliationListElementComponent } from './app/item-page/simple/field-components/specific-field/metadata-list/fields/affiliation/item-page-affiliation-list-element.component';
import { ItemPageAuthorListElementComponent } from './app/item-page/simple/field-components/specific-field/metadata-list/fields/author/item-page-author-list-element.component';
import { ItemPageAffiliationFieldComponent } from './app/item-page/simple/field-components/specific-field/affiliation/item-page-affiliation-field.component';
import { OrcidShortFormatComponent } from './app/item-page/simple/field-components/specific-field/orcid/orcid-short-format.component';

/**
 * Add components that use a custom decorator to ENTRY_COMPONENTS as well as DECLARATIONS.
 * This will ensure that decorator gets picked up when the app loads
 */
const ENTRY_COMPONENTS = [];

const DECLARATIONS = [
  ...ENTRY_COMPONENTS,
  AuthorInlineLabeledGroupContentComponent,
  FooterComponent,
  HeaderNavbarWrapperComponent,
  HomeNewsComponent,
  NavbarComponent,
  OrgUnitInlineLabeledGroupContentComponent,
  ItemPageAffiliationListElementComponent,
  ItemPageAuthorListElementComponent,
  ItemPageAffiliationFieldComponent,
  OrcidShortFormatComponent,
];

@NgModule({
  imports: [
    CommonModule,
    RootModule,
    ...DECLARATIONS,
  ],
  providers: [
    ...ENTRY_COMPONENTS.map((component) => ({ provide: component })),
  ],
})
/**
 * This module is included in the main bundle that gets downloaded at first page load. So it should
 * contain only the themed components that have to be available immediately for the first page load,
 * and the minimal set of imports required to make them work. Anything you can cut from it will make
 * the initial page load faster, but may cause the page to flicker as components that were already
 * rendered server side need to be lazy-loaded again client side
 *
 * Themed EntryComponents should also be added here
 */
export class EagerThemeModule {
}
