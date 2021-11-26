import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { CrisLayoutLoaderDirective } from './directives/cris-layout-loader.directive';
import { CrisLayoutComponent } from './cris-layout.component';
import { CrisLayoutLeadingComponent } from './cris-layout-leading/cris-layout-leading.component';
import { CrisLayoutLoaderComponent } from './cris-layout-loader/cris-layout-loader.component';
import { CrisLayoutMatrixComponent } from './cris-layout-matrix/cris-layout-matrix.component';
import { CrisLayoutVerticalComponent } from './cris-layout-loader/cris-layout-vertical/cris-layout-vertical.component';
import { CrisLayoutSidebarComponent } from './cris-layout-loader/cris-layout-vertical/cris-layout-sidebar/cris-layout-sidebar.component';
import { CrisLayoutHorizontalComponent } from './cris-layout-loader/cris-layout-horizontal/cris-layout-horizontal.component';
import { CrisLayoutNavbarComponent } from './cris-layout-loader/cris-layout-horizontal/cris-layout-navbar/cris-layout-navbar.component';
import { CrisLayoutSidebarItemComponent } from './cris-layout-loader/shared/sidebar-item/cris-layout-sidebar-item.component';
import { CrisLayoutBoxContainerComponent } from './cris-layout-matrix/cris-layout-box-container/cris-layout-box-container.component';
import { CrisLayoutTabsComponent } from './cris-layout-loader/shared/cris-layout-tabs/cris-layout-tabs.component';

import { RowComponent } from './cris-layout-matrix/cris-layout-box-container/boxes/metadata/row/row.component';
import { CrisLayoutMetadataBoxComponent } from './cris-layout-matrix/cris-layout-box-container/boxes/metadata/cris-layout-metadata-box.component';
import { TextComponent } from './cris-layout-matrix/cris-layout-box-container/boxes/metadata/components/text/text.component';
import { HeadingComponent } from './cris-layout-matrix/cris-layout-box-container/boxes/metadata/components/heading/heading.component';
import { CrisLayoutRelationBoxComponent } from './cris-layout-matrix/cris-layout-box-container/boxes/relation/cris-layout-relation-box.component';
import { SearchPageModule } from '../search-page/search-page.module';
import { MyDSpacePageModule } from '../my-dspace-page/my-dspace-page.module';
import { LongtextComponent } from './cris-layout-matrix/cris-layout-box-container/boxes/metadata/components/longtext/longtext.component';
import { DateComponent } from './cris-layout-matrix/cris-layout-box-container/boxes/metadata/components/date/date.component';
import { DsDatePipe } from './pipes/ds-date.pipe';
import { LinkComponent } from './cris-layout-matrix/cris-layout-box-container/boxes/metadata/components/link/link.component';
import { IdentifierComponent } from './cris-layout-matrix/cris-layout-box-container/boxes/metadata/components/identifier/identifier.component';
import { CrisrefComponent } from './cris-layout-matrix/cris-layout-box-container/boxes/metadata/components/crisref/crisref.component';
import { ThumbnailComponent } from './cris-layout-matrix/cris-layout-box-container/boxes/metadata/components/thumbnail/thumbnail.component';
import { AttachmentComponent } from './cris-layout-matrix/cris-layout-box-container/boxes/metadata/components/attachment/attachment.component';
import { OrcidSyncQueueComponent } from './cris-layout-matrix/cris-layout-box-container/boxes/orcid-sync-queue/orcid-sync-queue.component';
import { OrcidAuthorizationsComponent } from './cris-layout-matrix/cris-layout-box-container/boxes/orcid-authorizations/orcid-authorizations.component';
import { OrcidSyncSettingsComponent } from './cris-layout-matrix/cris-layout-box-container/boxes/orcid-sync-settings/orcid-sync-settings.component';
import { CrisLayoutMetricsBoxComponent } from './cris-layout-matrix/cris-layout-box-container/boxes/metrics/cris-layout-metrics-box.component';
import { MetricRowComponent } from './cris-layout-matrix/cris-layout-box-container/boxes/metadata/components/metric-row/metric-row.component';
import { ContextMenuModule } from '../shared/context-menu/context-menu.module';
import { TableComponent } from './cris-layout-matrix/cris-layout-box-container/boxes/metadata/components/table/table.component';
import { InlineComponent } from './cris-layout-matrix/cris-layout-box-container/boxes/metadata/components/inline/inline.component';
import { OrcidComponent } from './cris-layout-matrix/cris-layout-box-container/boxes/metadata/components/orcid/orcid.component';
import { ValuepairComponent } from './cris-layout-matrix/cris-layout-box-container/boxes/metadata/components/valuepair/valuepair.component';
import { TagComponent } from './cris-layout-matrix/cris-layout-box-container/boxes/metadata/components/tag/tag.component';

const ENTRY_COMPONENTS = [
  // put only entry components that use custom decorator
  CrisLayoutLoaderComponent,
  CrisLayoutMatrixComponent,
  CrisLayoutVerticalComponent,
  CrisLayoutHorizontalComponent,
  CrisLayoutMetadataBoxComponent,
  TextComponent,
  HeadingComponent,
  CrisLayoutRelationBoxComponent,
  LongtextComponent,
  DateComponent,
  LinkComponent,
  IdentifierComponent,
  CrisrefComponent,
  ThumbnailComponent,
  AttachmentComponent,
  OrcidSyncQueueComponent,
  OrcidAuthorizationsComponent,
  OrcidSyncSettingsComponent,
  CrisLayoutMetricsBoxComponent,
  MetricRowComponent,
  TableComponent,
  InlineComponent,
  OrcidComponent,
  ValuepairComponent,
  TagComponent,
  RowComponent
];
@NgModule({
  declarations: [
    CrisLayoutLoaderDirective,
    CrisLayoutComponent,
    CrisLayoutLeadingComponent,
    CrisLayoutLoaderComponent,
    CrisLayoutMatrixComponent,
    CrisLayoutVerticalComponent,
    CrisLayoutSidebarComponent,
    CrisLayoutHorizontalComponent,
    CrisLayoutNavbarComponent,
    CrisLayoutSidebarItemComponent,
    CrisLayoutBoxContainerComponent,
    CrisLayoutMetadataBoxComponent,
    TextComponent,
    HeadingComponent,
    CrisLayoutRelationBoxComponent,
    LongtextComponent,
    DateComponent,
    LinkComponent,
    IdentifierComponent,
    CrisrefComponent,
    ThumbnailComponent,
    AttachmentComponent,
    OrcidSyncQueueComponent,
    OrcidAuthorizationsComponent,
    OrcidSyncSettingsComponent,
    CrisLayoutMetricsBoxComponent,
    MetricRowComponent,
    TableComponent,
    InlineComponent,
    OrcidComponent,
    ValuepairComponent,
    TagComponent,
    DsDatePipe,
    RowComponent,
    CrisLayoutTabsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    SearchPageModule,
    MyDSpacePageModule,
    ContextMenuModule,
  ],
  exports: [
    CrisLayoutComponent,
  ]
})
export class CrisLayoutModule {
  /**
   * NOTE: this method allows to resolve issue with components that using a custom decorator
   * which are not loaded during CSR otherwise
   */
  static withEntryComponents() {
    return {
      ngModule: CrisLayoutModule,
      providers: ENTRY_COMPONENTS.map((component) => ({provide: component}))
    };
  }
}
