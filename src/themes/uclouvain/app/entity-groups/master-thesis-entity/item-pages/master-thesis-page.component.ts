import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ViewMode } from '../../../../../../app/core/shared/view-mode.model';
import { Context } from '../../../../../../app/core/shared/context.model';
import { listableObjectComponent } from '../../../../../../app/shared/object-collection/shared/listable-object/listable-object.decorator';
import { ItemComponent } from '../../../../../../app/item-page/simple/item-types/shared/item.component';
import { DSpaceObjectType } from '../../../../../../app/core/shared/dspace-object-type.model';
import { ThemedResultsBackButtonComponent } from 'src/app/shared/results-back-button/themed-results-back-button.component';
import { ContextMenuComponent } from 'src/app/shared/context-menu/context-menu.component';
import { ThemedItemPageTitleFieldComponent } from 'src/app/item-page/simple/field-components/specific-field/title/themed-item-page-field.component';
import { GenericItemPageFieldComponent } from 'src/app/item-page/simple/field-components/specific-field/generic/generic-item-page-field.component';
import { MetadataFieldWrapperComponent } from 'src/app/shared/metadata-field-wrapper/metadata-field-wrapper.component';
import { ThemedThumbnailComponent } from 'src/app/thumbnail/themed-thumbnail.component';
import { ThemedMediaViewerComponent } from 'src/app/item-page/media-viewer/themed-media-viewer.component';
import { ThemedFileSectionComponent } from 'src/app/item-page/simple/field-components/file-section/themed-file-section.component';
import { ThemedMetadataRepresentationListComponent } from 'src/app/item-page/simple/metadata-representation-list/themed-metadata-representation-list.component';
import { ItemPageUriFieldComponent } from 'src/app/item-page/simple/field-components/specific-field/uri/item-page-uri-field.component';
import { ItemPageAbstractFieldComponent } from 'src/app/item-page/simple/field-components/specific-field/abstract/item-page-abstract-field.component';
import { ItemPageTagFieldsComponent } from '../../../item-page/simple/field-components/specific-field/tags/item-page-tag-fields.component';
import { ItemPageListFieldsComponent } from '../../../item-page/simple/field-components/specific-field/list/item-page-list-fields.component';
import { RouterLink } from '@angular/router';
import { AsyncPipe, NgIf } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

/** Component to render 'MasterThesis' entity type for detailed view */

@listableObjectComponent('MasterThesis', ViewMode.StandalonePage, Context.Any, 'uclouvain')
@Component({
  selector: 'ds-master-thesis',
  styleUrls: ['./master-thesis-page.component.scss'],
  templateUrl: './master-thesis-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ThemedResultsBackButtonComponent,
    ContextMenuComponent,
    ThemedItemPageTitleFieldComponent,
    GenericItemPageFieldComponent,
    MetadataFieldWrapperComponent,
    ThemedThumbnailComponent,
    ThemedMediaViewerComponent,
    ThemedFileSectionComponent,
    ThemedMetadataRepresentationListComponent,
    ItemPageUriFieldComponent,
    ItemPageAbstractFieldComponent,
    ItemPageTagFieldsComponent,
    ItemPageListFieldsComponent,
    RouterLink,
    NgIf,
    TranslateModule,
    AsyncPipe,
  ],
  standalone: true,
})
export class MasterThesisPageComponent extends ItemComponent {
  protected readonly DspaceObjectType = DSpaceObjectType;
}
