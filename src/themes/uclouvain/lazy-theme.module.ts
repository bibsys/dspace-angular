import { NgModule } from '@angular/core';

import { AdminSidebarComponent } from './app/admin/admin-sidebar/admin-sidebar.component';
import { HomePageComponent } from './app/home-page/home-page.component';
import { SearchFormComponent } from './app/shared/search-form/search-form.component';
import { CountersSectionComponent } from './app/shared/explore/section-component/counters-section/counters-section.component';
import { SearchPageComponent } from './app/search-page/search-page.component';
import { ConfigurationSearchPageComponent } from './app/search-page/configuration-search-page.component';
import { LogInComponent } from './app/shared/log-in/log-in.component';
import { MyDSpaceStatusBadgeComponent } from './app/shared/object-collection/shared/badges/my-dspace-status-badge/my-dspace-status-badge.component';
import { BadgesComponent } from './app/shared/object-collection/shared/badges/badges.component';
import { BrowseMostElementsComponent } from './app/browse-most-elements/browse-most-elements.component';
import { ItemListPreviewComponent } from './app/shared/object-list/my-dspace-result-list-element/item-list-preview/item-list-preview.component';
import { LoginPageComponent } from './app/login-page/login-page.component';

import { CommonModule } from '@angular/common';
import { AdminRegistriesModule } from '../../app/admin/admin-registries/admin-registries.module';
import { AdminSearchModule } from '../../app/admin/admin-search-page/admin-search.module';
import { AdminWorkflowModuleModule } from '../../app/admin/admin-workflow-page/admin-workflow.module';
import { BitstreamFormatsModule } from '../../app/admin/admin-registries/bitstream-formats/bitstream-formats.module';
import { BrowseByModule } from '../../app/browse-by/browse-by.module';
import { CollectionFormModule } from '../../app/collection-page/collection-form/collection-form.module';
import { CommunityFormModule } from '../../app/community-page/community-form/community-form.module';
import { CoreModule } from '../../app/core/core.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { EditItemPageModule } from '../../app/item-page/edit-item-page/edit-item-page.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { IdlePreloadModule } from 'angular-idle-preload';
import { JournalEntitiesModule } from '../../app/entity-groups/journal-entities/journal-entities.module';
import { MyDspaceSearchModule } from '../../app/my-dspace-page/my-dspace-search.module';
import { MenuModule } from '../../app/shared/menu/menu.module';
import { NavbarModule } from '../../app/navbar/navbar.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProfilePageModule } from '../../app/profile-page/profile-page.module';
import { RegisterEmailFormModule } from '../../app/register-email-form/register-email-form.module';
import { ResearchEntitiesModule } from '../../app/entity-groups/research-entities/research-entities.module';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';
import { SearchPageModule } from '../../app/search-page/search-page.module';
import { SharedModule } from '../../app/shared/shared.module';
import { StatisticsModule } from '../../app/statistics/statistics.module';
import { StoreModule } from '@ngrx/store';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { TranslateModule } from '@ngx-translate/core';
import { HomePageModule } from '../../app/home-page/home-page.module';
import { AppModule } from '../../app/app.module';
import { ItemPageModule } from '../../app/item-page/item-page.module';
import { RouterModule } from '@angular/router';
import { CommunityListPageModule } from '../../app/community-list-page/community-list-page.module';
import { InfoModule } from '../../app/info/info.module';
import { StatisticsPageModule } from '../../app/statistics-page/statistics-page.module';
import { CommunityPageModule } from '../../app/community-page/community-page.module';
import { CollectionPageModule } from '../../app/collection-page/collection-page.module';
import { SubmissionModule } from '../../app/submission/submission.module';
import { MyDSpacePageModule } from '../../app/my-dspace-page/my-dspace-page.module';
import { SearchModule } from '../../app/shared/search/search.module';
import { ResourcePoliciesModule } from '../../app/shared/resource-policies/resource-policies.module';
import { ComcolModule } from '../../app/shared/comcol/comcol.module';
import { RootModule } from '../../app/root.module';
import { BrowseByPageModule } from '../../app/browse-by/browse-by-page.module';
import { ResultsBackButtonModule } from '../../app/shared/results-back-button/results-back-button.module';
import { SharedBrowseByModule } from '../../app/shared/browse-by/shared-browse-by.module';
import { ItemVersionsModule } from '../../app/item-page/versions/item-versions.module';
import { ItemSharedModule } from '../../app/item-page/item-shared.module';
import { MiradorViewerModule } from '../../app/item-page/mirador-viewer/mirador-viewer.module';
import { ExploreModule } from '../../app/shared/explore/explore.module';
import { FooterModule } from '../../app/footer/footer.module';
import { ContextMenuModule } from '../../app/shared/context-menu/context-menu.module';
import { SocialModule } from '../../app/social/social.module';
import { SubmissionSectionUploadFileComponent } from './app/submission/sections/upload/file/section-upload-file.component';
import {
  SubmissionSectionUploadFileLicenseComponent
} from './app/submission/sections/upload/file/license/section-upload-file-license.component';

const DECLARATIONS = [
  AdminSidebarComponent,
  HomePageComponent,
  SearchFormComponent,
  CountersSectionComponent,
  SearchPageComponent,
  ConfigurationSearchPageComponent,
  LogInComponent,
  MyDSpaceStatusBadgeComponent,
  BadgesComponent,
  BrowseMostElementsComponent,
  ItemListPreviewComponent,
  LoginPageComponent,
  SubmissionSectionUploadFileComponent,
  SubmissionSectionUploadFileLicenseComponent
];

@NgModule({
  imports: [
    AdminRegistriesModule,
    AdminSearchModule,
    AdminWorkflowModuleModule,
    AppModule,
    RootModule,
    BitstreamFormatsModule,
    BrowseByModule,
    BrowseByPageModule,
    ResultsBackButtonModule,
    CollectionFormModule,
    CollectionPageModule,
    CommonModule,
    CommunityFormModule,
    CommunityListPageModule,
    CommunityPageModule,
    CoreModule,
    DragDropModule,
    ItemSharedModule,
    ItemPageModule,
    EditItemPageModule,
    ItemVersionsModule,
    FormsModule,
    HomePageModule,
    HttpClientModule,
    IdlePreloadModule,
    InfoModule,
    JournalEntitiesModule,
    MenuModule,
    MyDspaceSearchModule,
    NavbarModule,
    NgbModule,
    ProfilePageModule,
    RegisterEmailFormModule,
    ResearchEntitiesModule,
    RouterModule,
    ScrollToModule,
    SearchPageModule,
    SharedModule,
    SharedBrowseByModule,
    StatisticsModule,
    StatisticsPageModule,
    StoreModule,
    StoreRouterConnectingModule,
    TranslateModule,
    SubmissionModule,
    MyDSpacePageModule,
    MyDspaceSearchModule,
    SearchModule,
    FormsModule,
    ResourcePoliciesModule,
    ComcolModule,
    ContextMenuModule,
    MiradorViewerModule,
    FooterModule,
    ExploreModule,
    SocialModule
  ],
  declarations: DECLARATIONS,
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
