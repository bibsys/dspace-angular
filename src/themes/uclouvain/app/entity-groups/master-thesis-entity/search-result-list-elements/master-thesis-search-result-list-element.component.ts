import { Component, Inject, OnInit } from '@angular/core';
import { ItemSearchResultListElementComponent } from '../../../shared/object-list/search-result-list-element/item-search-result/item-types/item/item-search-result-list-element.component';
import { ViewMode } from '../../../../../../app/core/shared/view-mode.model';
import { listableObjectComponent } from '../../../../../../app/shared/object-collection/shared/listable-object/listable-object.decorator';
import { isEmpty, isNotEmpty } from '../../../../../../app/shared/empty.util';
import { TruncatableComponent } from 'src/app/shared/truncatable/truncatable.component';
import { TruncatablePartComponent } from 'src/app/shared/truncatable/truncatable-part/truncatable-part.component';
import { MetadataLinkViewComponent } from 'src/app/shared/metadata-link-view/metadata-link-view.component';
import { ThemedBadgesComponent } from 'src/app/shared/object-collection/shared/badges/themed-badges.component';
import { MasterThesisFacultyBadgesComponent } from '../item-widgets/master-thesis-faculty-badges.component';
import { AsyncPipe, NgClass, NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ThemedThumbnailComponent } from 'src/app/thumbnail/themed-thumbnail.component';
import { TruncatableService } from '../../../../../../app/shared/truncatable/truncatable.service';
import { DSONameService } from '../../../../../../app/core/breadcrumbs/dso-name.service';
import { APP_CONFIG, AppConfig } from '../../../../../../config/app-config.interface';
import { AccessConditionsService } from '../../../shared/services/access-conditions.service';
import { AccessConditionObject } from '../../../../../../app/core/submission/models/access-condition.model';
import { AccessConditionsComponent } from '../../../shared/access-conditions/access-condition.component';

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

  protected readonly isNotEmpty = isNotEmpty;

  constructor(
    public dsoNameService: DSONameService,
    protected truncatableService: TruncatableService,
    protected accessConditionService: AccessConditionsService,
    @Inject(APP_CONFIG) protected appConfig?: AppConfig,
  ) {
    super(truncatableService, dsoNameService);
  }

  ngOnInit() {
    super.ngOnInit();
    this.dsoDate = this.dso.firstMetadataValue('dc.date.issued');
    this.dsoLanguage = this.dso.firstMetadataValue('dc.language.iso-639-2');
    this.dsoDegreeLabels = this.dso.allMetadataValues('masterthesis.rootdegree.label');
    if (isEmpty(this.dsoDegreeLabels)) {
      this.dsoDegreeLabels = this.dso.allMetadataValues('masterthesis.degree.label');
    }

    //TODO :: remove to use Item.accessStatus subresource
    this.accessConditionService.searchByItem(this.dso.uuid).subscribe(response => {
      if (response.hasOwnProperty('globalAccessType')) {
        this.accessCondition = Object.assign(new AccessConditionObject(), {
          id: 0,
          name: response.globalAccessType
        });
      }
    })
  }
}