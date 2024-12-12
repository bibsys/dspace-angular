import { NgModule } from '@angular/core';
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
import { AdvancedSearchComponent } from '../../app/shared/search/advanced-search/advanced-search.component';
import { SearchFilterComponent } from '../../app/shared/search/search-filters/search-filter/search-filter.component';

import { AdminSidebarComponent } from './app/admin/admin-sidebar/admin-sidebar.component';
import { ConfigurationSearchPageComponent } from './app/search-page/configuration-search-page.component';
import { LoginPageComponent } from './app/login-page/login-page.component';
import { MyDSpacePageComponent } from './app/my-dspace-page/my-dspace-page.component';
import { CreativeCommonsLicenseComponent } from './app/shared/cc-license/creative-commons-licence.component';
import { FileDownloadLinkComponent } from './app/shared/file-download-link/file-download-link.component';
import { SearchComponent } from './app/shared/search/search.component';
import { SearchFiltersComponent } from './app/shared/search/search-filters/search-filters.component';
import { SearchFormComponent } from './app/shared/search-form/search-form.component';
import { SearchPageComponent } from './app/search-page/search-page.component';
import { SearchSidebarComponent } from './app/shared/search/search-sidebar/search-sidebar.component';
import {
  SubmissionSectionUploadFileComponent
} from './app/submission/sections/upload/file/section-upload-file.component';


const DECLARATIONS = [
  AdminSidebarComponent,
  ConfigurationSearchPageComponent,
  LoginPageComponent,
  MyDSpacePageComponent,
  SearchComponent,
  SearchFiltersComponent,
  SearchFormComponent,
  SearchPageComponent,
  SearchSidebarComponent,
  SubmissionSectionUploadFileComponent,
  CreativeCommonsLicenseComponent,
  FileDownloadLinkComponent
];

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
    SearchFilterComponent,
    AdvancedSearchComponent,
    ...DECLARATIONS,
  ],
  exports: [
    SearchFormComponent,
    SearchComponent,
    SearchSidebarComponent,
    SearchFiltersComponent
  ]
})

/**
 * This module serves as an index for all the components in this theme.
 * It should import all other modules, so the compiler knows where to find any components referenced
 * from a component in this theme
 * It is purposefully not exported, it should never be imported anywhere else, its only purpose is
 * to give lazily loaded components a context in which they can be compiled successfully
 */
class LazyThemeModule {
}
