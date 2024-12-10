import { NgModule } from '@angular/core';

import { HomePageComponent } from './app/home-page/home-page.component';
import { SearchFormComponent } from './app/shared/search-form/search-form.component';
import { CountersSectionComponent } from './app/shared/explore/section-component/counters-section/counters-section.component';
import { SearchPageComponent } from './app/search-page/search-page.component';
import { ConfigurationSearchPageComponent } from './app/search-page/configuration-search-page.component';
import { MyDSpaceStatusBadgeComponent } from './app/shared/object-collection/shared/badges/my-dspace-status-badge/my-dspace-status-badge.component';
import { BadgesComponent } from './app/shared/object-collection/shared/badges/badges.component';
import { BrowseMostElementsComponent } from './app/browse-most-elements/browse-most-elements.component';
import { ItemListPreviewComponent } from './app/shared/object-list/my-dspace-result-list-element/item-list-preview/item-list-preview.component';
import { LoginPageComponent } from './app/login-page/login-page.component';
import { MetadataRepresentationListComponent } from './app/item-page/simple/metadata-representation-list/metadata-representation-list.component';
import { ObjectListComponent } from './app/shared/object-list/object-list.component'
import { SearchResultsComponent } from './app/shared/search/search-results/search-results.component';
import { SearchSidebarComponent } from './app/shared/search/search-sidebar/search-sidebar.component';
import { SearchFiltersComponent } from './app/shared/search/search-filters/search-filters.component';
import { SearchComponent } from './app/shared/search/search.component';
import { FullFileSectionComponent } from './app/item-page/full/field-components/file-section/full-file-section.component';
import { UploadFileDescriptionComponent } from './app/item-page/full/field-components/file-section/upload-file-description/upload-file-description.component';
import { FileSectionComponent } from './app/item-page/simple/field-components/file-section/file-section.component';
import { FileDownloadLinkComponent } from './app/shared/file-download-link/file-download-link.component';

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
import { AdminSidebarComponent } from './app/admin/admin-sidebar/admin-sidebar.component';
import { DefaultBrowseElementsComponent } from './app/browse-most-elements/default-browse-elements/default-browse-elements.component';
import { NgxGalleryModule } from '@kolkov/ngx-gallery';
import { SubmissionSectionUploadFileComponent } from './app/submission/sections/upload/file/section-upload-file.component';
import { ItemPageTitleFieldComponent } from './app/item-page/simple/field-components/specific-field/title/item-page-title-field.component';
import { ExpandableNavbarSectionComponent } from './app/navbar/expandable-navbar-section/expandable-navbar-section.component';
import { AuthNavMenuComponent } from './app/shared/auth-nav-menu/auth-nav-menu.component';
import { UserMenuComponent } from './app/shared/auth-nav-menu/user-menu/user-menu.component';
import { StatusBadgeComponent } from './app/shared/object-collection/shared/badges/status-badge/status-badge.component';
import { BrowseByComponent } from './app/shared/browse-by/browse-by.component';

const DECLARATIONS = [
  AuthNavMenuComponent,
  UserMenuComponent,
  HomePageComponent,
  SearchFormComponent,
  CountersSectionComponent,
  SearchPageComponent,
  ConfigurationSearchPageComponent,
  MyDSpaceStatusBadgeComponent,
  BadgesComponent,
  BrowseMostElementsComponent,
  DefaultBrowseElementsComponent,
  ItemListPreviewComponent,
  LoginPageComponent,
  AdminSidebarComponent,
  SubmissionSectionUploadFileComponent,
  MetadataRepresentationListComponent,
  SearchResultsComponent,
  ObjectListComponent,
  SearchSidebarComponent,
  SearchFiltersComponent,
  SearchComponent,
  ItemPageTitleFieldComponent,
  FullFileSectionComponent,
  UploadFileDescriptionComponent,
  FileSectionComponent,
  FileDownloadLinkComponent,
  ExpandableNavbarSectionComponent,
  StatusBadgeComponent,
  BrowseByComponent
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
  exports: [
    ConfigurationSearchPageComponent,
  ],
})
class LazyThemeModule { }
