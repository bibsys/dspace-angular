import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
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
import { AsyncPipe, DatePipe, KeyValuePipe, NgFor, NgIf } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { MasterThesisFacultyBadgesComponent } from '../item-widgets/master-thesis-faculty-badges.component';
import { MetadataUriValuesComponent } from 'src/app/item-page/field-components/metadata-uri-values/metadata-uri-values.component';
import { isNotEmpty } from '../../../../../../app/shared/empty.util';
import { RouteService } from '../../../../../../app/core/services/route.service';
import { Router } from '@angular/router';
import { RoleService } from '../../../../../../app/core/roles/role.service';
import { Observable } from 'rxjs';
import { RoleType } from '../../../../../../app/core/roles/role-types';
import { MasterThesisIdentifierPipe } from '../pipes/master-thesis-identifier.pipe';
import { PublicationPageCitationsComponent } from '../../publication-entity/item-pages/publication-page-citations/publication-page-citations.component';


/** How to find and extract publication identifiers
 *  For each entry we need to define 3 keys:
 *    - field: the metadata field name where to find the identifier
 *    - labelFn: a function to get/extract the identifier label. This function will receive the identifier value as param.
 *    - valueFn: a function to get/extract the identifier value. This function will receive the identifier value as param.
 *               If the extracted value is `null` (or empty), identifier will not be extracted.
 *               If the extracted value isn't a `string`, the value will not be displayed (only the label in this case).
 */
const identifiersExtractors = [
  {
    field: 'dc.identifier.fedora',
    labelFn: () => 'fedora',
    valueFn: (v: string) => v
  }, {
    field: 'dc.identifier.other',
    labelFn: (v: string) =>  v.match(/^([^:]+)::/)?.[1].toLowerCase() || 'other',
    valueFn: (v: string) => v.match(/::(.*)/)?.[1] || v
  }, {
    field: 'dcterms.provenance',
    labelFn: () => 'cataretro',
    valueFn: (v: string) => v.toLowerCase() === 'cataretro' ? true : null,
  }
];


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
    MasterThesisFacultyBadgesComponent,
    MetadataUriValuesComponent,
    NgIf,
    TranslateModule,
    AsyncPipe,
    DatePipe,
    NgFor,
    MasterThesisIdentifierPipe,
    KeyValuePipe,
    PublicationPageCitationsComponent,
  ],
  standalone: true,
})
export class MasterThesisPageComponent extends ItemComponent {
  protected readonly DspaceObjectType = DSpaceObjectType;
  dateFormat = 'yyyy-MM-dd HH:mm:ss';
  dsoDate: string;
  isUserAdmin: Observable<boolean>;
  externalIdentifiers: { [key: string]: any } = {};

  @Input()
  showCorrection: boolean;

  protected readonly isNotEmpty = isNotEmpty;

  /**
   * Constructor
   * @param routeService RouteService
   * @param router       Router
   * @param roleService  RoleService
   */
  constructor(
    protected routeService: RouteService,
    protected router: Router,
    protected roleService: RoleService,
  ) {
    super(routeService, router);
  }

  /** OnInit hook */
  ngOnInit() {
    super.ngOnInit();
    this.isUserAdmin = this.roleService.checkRole(RoleType.Admin);
    this.dsoDate = this.object.firstMetadataValue('dc.date.issued');

    // Load legacy identifiers
    identifiersExtractors.forEach(({ field, labelFn, valueFn }) => {
      this.object.allMetadataValues(field).forEach(mv => {
        const value = valueFn(mv);
        if (isNotEmpty(value)) {
          this.externalIdentifiers[labelFn(mv)] = value;
        }
      });
    });
  }
}
