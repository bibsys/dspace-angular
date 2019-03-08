import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NouisliderModule } from 'ng2-nouislider';

import { NgbDatepickerModule, NgbModule, NgbTimepickerModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';

import { TranslateModule } from '@ngx-translate/core';

import { NgxPaginationModule } from 'ngx-pagination';

import { FileUploadModule } from 'ng2-file-upload';

import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { EnumKeysPipe } from './utils/enum-keys-pipe';
import { FileSizePipe } from './utils/file-size-pipe';
import { SafeUrlPipe } from './utils/safe-url-pipe';
import { ConsolePipe } from './utils/console.pipe';

import { CollectionListElementComponent } from './object-list/collection-list-element/collection-list-element.component';
import { CommunityListElementComponent } from './object-list/community-list-element/community-list-element.component';
import { ItemListElementComponent } from './object-list/item-list-element/item-list-element.component';
import { SearchResultListElementComponent } from './object-list/search-result-list-element/search-result-list-element.component';
import { WrapperListElementComponent } from './object-list/wrapper-list-element/wrapper-list-element.component';
import { ObjectListComponent } from './object-list/object-list.component';
import { CollectionGridElementComponent } from './object-grid/collection-grid-element/collection-grid-element.component';
import { CommunityGridElementComponent } from './object-grid/community-grid-element/community-grid-element.component';
import { ItemGridElementComponent } from './object-grid/item-grid-element/item-grid-element.component';
import { AbstractListableElementComponent } from './object-collection/shared/object-collection-element/abstract-listable-element.component';
import { WrapperGridElementComponent } from './object-grid/wrapper-grid-element/wrapper-grid-element.component';
import { ObjectGridComponent } from './object-grid/object-grid.component';
import { ObjectCollectionComponent } from './object-collection/object-collection.component';
import { ComcolPageContentComponent } from './comcol-page-content/comcol-page-content.component';
import { ComcolPageHeaderComponent } from './comcol-page-header/comcol-page-header.component';
import { ComcolPageLogoComponent } from './comcol-page-logo/comcol-page-logo.component';
import { ErrorComponent } from './error/error.component';
import { LoadingComponent } from './loading/loading.component';
import { PaginationComponent } from './pagination/pagination.component';
import { ThumbnailComponent } from '../thumbnail/thumbnail.component';
import { SearchFormComponent } from './search-form/search-form.component';
import { SearchResultGridElementComponent } from './object-grid/search-result-grid-element/search-result-grid-element.component';
import { ViewModeSwitchComponent } from './view-mode-switch/view-mode-switch.component';
import { GridThumbnailComponent } from './object-grid/grid-thumbnail/grid-thumbnail.component';
import { VarDirective } from './utils/var.directive';
import { LogInComponent } from './log-in/log-in.component';
import { AuthNavMenuComponent } from './auth-nav-menu/auth-nav-menu.component';
import { LogOutComponent } from './log-out/log-out.component';
import { FormComponent } from './form/form.component';
import { DsDynamicTypeaheadComponent } from './form/builder/ds-dynamic-form-ui/models/typeahead/dynamic-typeahead.component';
import { DsDynamicScrollableDropdownComponent } from './form/builder/ds-dynamic-form-ui/models/scrollable-dropdown/dynamic-scrollable-dropdown.component';
import {
  DsDynamicFormControlContainerComponent,
  dsDynamicFormControlMapFn
} from './form/builder/ds-dynamic-form-ui/ds-dynamic-form-control-container.component';
import { DsDynamicFormComponent } from './form/builder/ds-dynamic-form-ui/ds-dynamic-form.component';
import { DYNAMIC_FORM_CONTROL_MAP_FN, DynamicFormsCoreModule } from '@ng-dynamic-forms/core';
import { DynamicFormsNGBootstrapUIModule } from '@ng-dynamic-forms/ui-ng-bootstrap';
import { TextMaskModule } from 'angular2-text-mask';
import { DragClickDirective } from './utils/drag-click.directive';
import { TruncatePipe } from './utils/truncate.pipe';
import { TruncatableComponent } from './truncatable/truncatable.component';
import { TruncatableService } from './truncatable/truncatable.service';
import { TruncatablePartComponent } from './truncatable/truncatable-part/truncatable-part.component';
import { UploaderComponent } from './uploader/uploader.component';
import { ChipsComponent } from './chips/chips.component';
import { DsDynamicTagComponent } from './form/builder/ds-dynamic-form-ui/models/tag/dynamic-tag.component';
import { DsDynamicListComponent } from './form/builder/ds-dynamic-form-ui/models/list/dynamic-list.component';
import { DsDynamicFormGroupComponent } from './form/builder/ds-dynamic-form-ui/models/form-group/dynamic-form-group.component';
import { DsDynamicFormArrayComponent } from './form/builder/ds-dynamic-form-ui/models/array-group/dynamic-form-array.component';
import { DsDynamicRelationGroupComponent } from './form/builder/ds-dynamic-form-ui/models/relation-group/dynamic-relation-group.components';
import { DsDatePickerInlineComponent } from './form/builder/ds-dynamic-form-ui/models/date-picker-inline/dynamic-date-picker-inline.component';
import { SortablejsModule } from 'angular-sortablejs';
import { NumberPickerComponent } from './number-picker/number-picker.component';
import { DsDatePickerComponent } from './form/builder/ds-dynamic-form-ui/models/date-picker/date-picker.component';
import { DsDynamicLookupComponent } from './form/builder/ds-dynamic-form-ui/models/lookup/dynamic-lookup.component';
import { MockAdminGuard } from './mocks/mock-admin-guard.service';
import { AlertsComponent } from './alerts/alerts.component';
import { MyDSpaceResultListElementComponent } from './object-list/my-dspace-result-list-element/my-dspace-result-list-element.component';
import { MessageBoardComponent } from './message-board/message-board.component';
import { MessageComponent } from './message-board/message/message.component';
import { MyDSpaceResultDetailElementComponent } from './object-detail/my-dspace-result-detail-element/my-dspace-result-detail-element.component';
import { ClaimedTaskActionsComponent } from './mydspace-actions/claimed-task/claimed-task-actions.component';
import { PoolTaskActionsComponent } from './mydspace-actions/pool-task/pool-task-actions.component';
import { ObjectDetailComponent } from './object-detail/object-detail.component';
import { WrapperDetailElementComponent } from './object-detail/wrapper-detail-element/wrapper-detail-element.component';
import { ItemDetailPreviewComponent } from './object-detail/my-dspace-result-detail-element/item-detail-preview/item-detail-preview.component';
import { MyDSpaceItemStatusComponent } from './object-collection/shared/mydspace-item-status/my-dspace-item-status.component';
import { WorkspaceitemActionsComponent } from './mydspace-actions/workspaceitem/workspaceitem-actions.component';
import { WorkflowitemActionsComponent } from './mydspace-actions/workflowitem/workflowitem-actions.component';
import { ItemSubmitterComponent } from './object-collection/shared/mydspace-item-submitter/item-submitter.component';
import { ItemActionsComponent } from './mydspace-actions/item/item-actions.component';
import { ClaimedTaskActionsApproveComponent } from './mydspace-actions/claimed-task/approve/claimed-task-actions-approve.component';
import { ClaimedTaskActionsRejectComponent } from './mydspace-actions/claimed-task/reject/claimed-task-actions-reject.component';
import { ObjNgFor } from './utils/object-ngfor.pipe';
import { BrowseByComponent } from './browse-by/browse-by.component';
import { BrowseEntryListElementComponent } from './object-list/browse-entry-list-element/browse-entry-list-element.component';
import { DebounceDirective } from './utils/debounce.directive';
import { ClickOutsideDirective } from './utils/click-outside.directive';
import { EmphasizePipe } from './utils/emphasize.pipe';
import { InputSuggestionsComponent } from './input-suggestions/input-suggestions.component';
import { CapitalizePipe } from './utils/capitalize.pipe';
import { ObjectKeysPipe } from './utils/object-keys-pipe';
import { MomentModule } from 'ngx-moment';
import { AuthorityConfidenceStateDirective } from './authority-confidence/authority-confidence-state.directive';
import { MenuModule } from './menu/menu.module';
import { ComColFormComponent } from './comcol-forms/comcol-form/comcol-form.component';
import { CreateComColPageComponent } from './comcol-forms/create-comcol-page/create-comcol-page.component';
import { EditComColPageComponent } from './comcol-forms/edit-comcol-page/edit-comcol-page.component';
import { DeleteComColPageComponent } from './comcol-forms/delete-comcol-page/delete-comcol-page.component';
import { LangSwitchComponent } from './lang-switch/lang-switch.component';
import { ComcolPageBrowseByComponent } from './comcol-page-browse-by/comcol-page-browse-by.component';
import { ItemListPreviewComponent } from './object-list/item-list-preview/item-list-preview.component';
import { ItemPageAuthorFieldComponent } from '../+item-page/simple/field-components/specific-field/author/item-page-author-field.component';
import { ItemPageDateFieldComponent } from '../+item-page/simple/field-components/specific-field/date/item-page-date-field.component';
import { ItemPageAbstractFieldComponent } from '../+item-page/simple/field-components/specific-field/abstract/item-page-abstract-field.component';
import { ItemPageUriFieldComponent } from '../+item-page/simple/field-components/specific-field/uri/item-page-uri-field.component';
import { ItemPageTitleFieldComponent } from '../+item-page/simple/field-components/specific-field/title/item-page-title-field.component';
import { ItemPageSpecificFieldComponent } from '../+item-page/simple/field-components/specific-field/item-page-specific-field.component';
import { FileSectionComponent } from '../+item-page/simple/field-components/file-section/file-section.component';
import { MetadataFieldWrapperComponent } from '../+item-page/field-components/metadata-field-wrapper/metadata-field-wrapper.component';
import { CollectionsComponent } from '../+item-page/field-components/collections/collections.component';
import { MetadataValuesComponent } from '../+item-page/field-components/metadata-values/metadata-values.component';
import { MetadataUriValuesComponent } from '../+item-page/field-components/metadata-uri-values/metadata-uri-values.component';
import { RoleDirective } from './roles/role.directive';
import { UserMenuComponent } from './auth-nav-menu/user-menu/user-menu.component';

const MODULES = [
  // Do NOT include UniversalModule, HttpModule, or JsonpModule here
  CommonModule,
  SortablejsModule,
  DynamicFormsCoreModule,
  DynamicFormsNGBootstrapUIModule,
  FileUploadModule,
  FormsModule,
  InfiniteScrollModule,
  NgbModule,
  NgbDatepickerModule,
  NgbTimepickerModule,
  NgbTypeaheadModule,
  NgxPaginationModule,
  ReactiveFormsModule,
  RouterModule,
  TranslateModule,
  NouisliderModule,
  MomentModule,
  TextMaskModule,
  MenuModule
];

const PIPES = [
  // put shared pipes here
  EnumKeysPipe,
  FileSizePipe,
  SafeUrlPipe,
  TruncatePipe,
  EmphasizePipe,
  CapitalizePipe,
  ObjectKeysPipe,
  ConsolePipe,
  ObjNgFor
];

const COMPONENTS = [
  // put shared components here
  AlertsComponent,
  AuthNavMenuComponent,
  UserMenuComponent,
  ChipsComponent,
  ComcolPageContentComponent,
  ComcolPageHeaderComponent,
  ComcolPageLogoComponent,
  ComColFormComponent,
  CreateComColPageComponent,
  EditComColPageComponent,
  DeleteComColPageComponent,
  ComcolPageBrowseByComponent,
  DsDynamicFormComponent,
  DsDynamicFormControlContainerComponent,
  DsDynamicListComponent,
  DsDynamicLookupComponent,
  DsDynamicScrollableDropdownComponent,
  DsDynamicTagComponent,
  DsDynamicTypeaheadComponent,
  DsDynamicRelationGroupComponent,
  DsDatePickerComponent,
  DsDynamicFormGroupComponent,
  DsDynamicFormArrayComponent,
  DsDatePickerInlineComponent,
  ErrorComponent,
  FormComponent,
  LangSwitchComponent,
  LoadingComponent,
  LogInComponent,
  LogOutComponent,
  MessageBoardComponent,
  MessageComponent,
  NumberPickerComponent,
  ObjectListComponent,
  ObjectDetailComponent,
  ObjectGridComponent,
  AbstractListableElementComponent,
  WrapperListElementComponent,
  WrapperDetailElementComponent,
  WrapperGridElementComponent,
  ObjectCollectionComponent,
  PaginationComponent,
  SearchFormComponent,
  ThumbnailComponent,
  GridThumbnailComponent,
  UploaderComponent,
  WrapperListElementComponent,
  ItemListPreviewComponent,
  MyDSpaceItemStatusComponent,
  ItemSubmitterComponent,
  ItemDetailPreviewComponent,
  ClaimedTaskActionsComponent,
  ClaimedTaskActionsApproveComponent,
  ClaimedTaskActionsRejectComponent,
  ItemActionsComponent,
  PoolTaskActionsComponent,
  WorkflowitemActionsComponent,
  WorkspaceitemActionsComponent,
  ViewModeSwitchComponent,
  TruncatableComponent,
  TruncatablePartComponent,
  BrowseByComponent,
  InputSuggestionsComponent,
];

const ENTRY_COMPONENTS = [
  // put shared entry components (components that are created dynamically) here
  ItemListElementComponent,
  CollectionListElementComponent,
  CommunityListElementComponent,
  MyDSpaceResultListElementComponent,
  SearchResultListElementComponent,
  ItemGridElementComponent,
  CollectionGridElementComponent,
  CommunityGridElementComponent,
  SearchResultGridElementComponent,
  BrowseEntryListElementComponent,
  MyDSpaceResultDetailElementComponent,
  SearchResultGridElementComponent,
  DsDynamicListComponent,
  DsDynamicLookupComponent,
  DsDynamicScrollableDropdownComponent,
  DsDynamicTagComponent,
  DsDynamicTypeaheadComponent,
  DsDynamicRelationGroupComponent,
  DsDatePickerComponent,
  DsDynamicFormGroupComponent,
  DsDynamicFormArrayComponent,
  DsDatePickerInlineComponent
];

const SHARED_ITEM_PAGE_COMPONENTS = [
  CollectionsComponent,
  FileSectionComponent,
  ItemPageAuthorFieldComponent,
  ItemPageDateFieldComponent,
  ItemPageAbstractFieldComponent,
  ItemPageUriFieldComponent,
  ItemPageTitleFieldComponent,
  ItemPageSpecificFieldComponent,
  MetadataFieldWrapperComponent,
  MetadataValuesComponent,
  MetadataUriValuesComponent
];

const PROVIDERS = [
  TruncatableService,
  MockAdminGuard,
  {
    provide: DYNAMIC_FORM_CONTROL_MAP_FN,
    useValue: dsDynamicFormControlMapFn
  }
];

const DIRECTIVES = [
  VarDirective,
  DragClickDirective,
  DebounceDirective,
  ClickOutsideDirective,
  AuthorityConfidenceStateDirective,
  RoleDirective
];

@NgModule({
  imports: [
    ...MODULES
  ],
  declarations: [
    ...PIPES,
    ...COMPONENTS,
    ...DIRECTIVES,
    ...ENTRY_COMPONENTS,
    ...SHARED_ITEM_PAGE_COMPONENTS
  ],
  providers: [
    ...PROVIDERS
  ],
  exports: [
    ...MODULES,
    ...PIPES,
    ...COMPONENTS,
    ...SHARED_ITEM_PAGE_COMPONENTS,
    ...DIRECTIVES
  ],
  entryComponents: [
    ...ENTRY_COMPONENTS
  ]
})

/**
 * This module handles all components and pipes that need to be shared among multiple other modules
 */
export class SharedModule {

}
