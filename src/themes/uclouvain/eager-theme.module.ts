import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExploreModule } from '../../app/shared/explore/explore.module';
import { FooterModule } from '../../app/footer/footer.module';
import { NavbarModule } from '../../app/navbar/navbar.module';
import { ResultsBackButtonModule } from '../../app/shared/results-back-button/results-back-button.module';
import { RootModule } from '../../app/root.module';
import { SharedBrowseByModule } from '../../app/shared/browse-by/shared-browse-by.module';
import { SharedModule } from '../../app/shared/shared.module';

import { AuthorInlineLabeledGroupContentComponent } from './app/shared/form/builder/models/authors/authors-inline-labeled-group-content.component';
import { FooterComponent } from './app/footer/footer.component';
import { HeaderNavbarWrapperComponent } from './app/header-nav-wrapper/header-navbar-wrapper.component';
import { HomeNewsComponent } from './app/home-page/home-news/home-news.component';
import { NavbarComponent } from './app/navbar/navbar.component';
import { OrgUnitInlineLabeledGroupContentComponent } from './app/shared/form/builder/models/org-unit/org-unit-inline-labeled-group-content.component';
import { PublicationModule } from './app/entity-groups/publication-entity/publication.module';

/**
 * Add components that use a custom decorator to ENTRY_COMPONENTS as well as DECLARATIONS.
 * This will ensure that decorator gets picked up when the app loads
 */
const ENTRY_COMPONENTS = [
];

const DECLARATIONS = [
  ...ENTRY_COMPONENTS,
  AuthorInlineLabeledGroupContentComponent,
  FooterComponent,
  HeaderNavbarWrapperComponent,
  HomeNewsComponent,
  NavbarComponent,
  OrgUnitInlineLabeledGroupContentComponent,
];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    SharedBrowseByModule,
    ResultsBackButtonModule,
    RootModule,
    NavbarModule,
    ExploreModule,
    FooterModule,
    PublicationModule,
  ],
  declarations: DECLARATIONS,
  providers: [
    ...ENTRY_COMPONENTS.map((component) => ({provide: component}))
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
