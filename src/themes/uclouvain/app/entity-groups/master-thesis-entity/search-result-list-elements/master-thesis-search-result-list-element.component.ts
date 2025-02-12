import { Component, Inject, OnInit } from '@angular/core';
import { ItemSearchResultListElementComponent } from '../../../shared/object-list/search-result-list-element/item-search-result/item-types/item/item-search-result-list-element.component';
import { ViewMode } from '../../../../../../app/core/shared/view-mode.model';
import { listableObjectComponent } from '../../../../../../app/shared/object-collection/shared/listable-object/listable-object.decorator';
import { isEmpty } from '../../../../../../app/shared/empty.util';
import { TruncatableComponent } from 'src/app/shared/truncatable/truncatable.component';
import { TruncatablePartComponent } from 'src/app/shared/truncatable/truncatable-part/truncatable-part.component';
import { MetadataLinkViewComponent } from 'src/app/shared/metadata-link-view/metadata-link-view.component';
import { ThemedBadgesComponent } from 'src/app/shared/object-collection/shared/badges/themed-badges.component';
import { MasterThesisFacultyBadgesComponent } from '../item-widgets/master-thesis-faculty-badges.component';
import { AsyncPipe, NgClass, NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ThemedThumbnailComponent } from 'src/app/thumbnail/themed-thumbnail.component';
import { getFirstSucceededRemoteDataWithNotEmptyPayload } from '../../../../../../app/core/shared/operators';
import {
  AccessStatusObject
} from '../../../../../../app/shared/object-collection/shared/badges/access-status-badge/access-status.model';
import { AccessConditionObject } from '../../../../../../app/core/submission/models/access-condition.model';
import { AccessConditionsComponent } from '../../../shared/access-conditions/access-condition.component';
import { Observable } from 'rxjs';
import { RoleType } from '../../../../../../app/core/roles/role-types';
import { TruncatableService } from '../../../../../../app/shared/truncatable/truncatable.service';
import { DSONameService } from '../../../../../../app/core/breadcrumbs/dso-name.service';
import { RoleService } from '../../../../../../app/core/roles/role.service';
import { APP_CONFIG, AppConfig } from 'src/config/app-config.interface';

@listableObjectComponent('MasterThesisSearchResult', ViewMode.ListElement)
@Component({
  selector: 'ds-master-thesis-search-result-list-element',
  templateUrl: './master-thesis-search-result-list-element.component.html',
  imports: [
    ThemedThumbnailComponent,
    ThemedBadgesComponent,
    TruncatableComponent,
    TruncatablePartComponent,
    MetadataLinkViewComponent,
    MasterThesisFacultyBadgesComponent,
    AccessConditionsComponent,
    NgIf,
    RouterLink,
    NgClass,
    NgFor,
    TranslateModule,
    AsyncPipe,
  ],
  standalone: true,
})
/**
 * The component for displaying a list element for an item search result of the type Master thesis
 */
export class MasterThesisSearchResultListElementComponent extends ItemSearchResultListElementComponent implements OnInit {

  dsoDate: string;
  dsoLanguage: string;
  dsoDegreeLabels: string[];
  accessCondition: AccessConditionObject;
  userIsAdmin: Observable<boolean>;
  isCataretro = false;

  constructor(
    protected truncatableService: TruncatableService,
    public dsoNameService: DSONameService,
    private roleService: RoleService,
    @Inject(APP_CONFIG) protected appConfig: AppConfig,
  ) {
    super(truncatableService, dsoNameService, appConfig);
  }

  ngOnInit() {
    super.ngOnInit();
    this.dsoDate = this.dso.firstMetadataValue('dc.date.issued');
    this.dsoLanguage = this.dso.firstMetadataValue('dc.language.iso-639-2');
    this.dsoDegreeLabels = this.dso.allMetadataValues('masterthesis.rootdegree.label');
    if (isEmpty(this.dsoDegreeLabels)) {
      this.dsoDegreeLabels = this.dso.allMetadataValues('masterthesis.degree.label');
    }
    if (this.dso?.accessStatus) {
      this.dso.accessStatus
        .pipe(getFirstSucceededRemoteDataWithNotEmptyPayload())
        .subscribe((access: AccessStatusObject) => {
          this.accessCondition = Object.assign(new AccessConditionObject(), {id: 0, name: access.status});
        });
    }
    this.userIsAdmin = this.roleService.checkRole(RoleType.Admin);
    this.isCataretro = this.dso.allMetadataValues("dcterms.provenance").some(mv => mv === 'cataretro');
  }
}