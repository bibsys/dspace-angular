import { NgModule } from '@angular/core';

import { SearchPageComponent } from './app/search-page/search-page.component';
import { ConfigurationSearchPageComponent } from './app/search-page/configuration-search-page.component';
import { LoginPageComponent } from './app/login-page/login-page.component';
import { SearchFormComponent } from './app/shared/search-form/search-form.component';
import {AdminSidebarComponent} from "./app/admin/admin-sidebar/admin-sidebar.component";

import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';
import { StoreModule } from '@ngrx/store';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { RootModule } from '../../app/root.module';
import { NgxGalleryModule } from '@kolkov/ngx-gallery';
import {SearchComponent} from "./app/shared/search/search.component";
import {SearchFiltersComponent} from "./app/shared/search/search-filters/search-filters.component";
import {SearchResultsComponent} from "./app/shared/search/search-results/search-results.component";
import {SearchSidebarComponent} from "./app/shared/search/search-sidebar/search-sidebar.component";
import {ObjectListComponent} from "./app/shared/object-list/object-list.component";
import {
  ItemListPreviewComponent
} from "./app/shared/object-list/my-dspace-result-list-element/item-list-preview/item-list-preview.component";
import {
  ExpandableNavbarSectionComponent
} from "./app/navbar/expandable-navbar-section/expandable-navbar-section.component";
import {FullFileSectionComponent} from "./app/item-page/full/field-components/file-section/full-file-section.component";
import {FileSectionComponent} from "./app/item-page/simple/field-components/file-section/file-section.component";
import {
  MetadataRepresentationListComponent
} from "./app/item-page/simple/metadata-representation-list/metadata-representation-list.component";
import {FileDownloadLinkComponent} from "./app/shared/file-download-link/file-download-link.component";
import {CreativeCommonsLicenseComponent} from "./app/shared/cc-license/creative-commons-licence.component";
import {ItemVersionsComponent} from "./app/item-page/versions/item-versions.component";
import {FullItemPageComponent} from "./app/item-page/full/full-item-page.component";

const DECLARATIONS = [
  LoginPageComponent,
  AdminSidebarComponent,
  ExpandableNavbarSectionComponent,
];

/**
 * This module serves as an index for all the components in this theme.
 * It should import all other modules, so the compiler knows where to find any components referenced
 * from a component in this theme
 * It is purposefully not exported, it should never be imported anywhere else, its only purpose is
 * to give lazily loaded components a context in which they can be compiled successfully
 */
@NgModule({
  imports: [
    RootModule,
    CommonModule,
    DragDropModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    RouterModule,
    ScrollToModule,
    StoreModule,
    StoreRouterConnectingModule,
    TranslateModule,
    FormsModule,
    NgxGalleryModule,
    ...DECLARATIONS,
  ],
  declarations: [],
})
class LazyThemeModule {
}
