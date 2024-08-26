import { Component, OnInit } from '@angular/core';
import { ItemSearchResultListElementComponent } from '../../../shared/object-list/search-result-list-element/item-search-result/item-types/item/item-search-result-list-element.component';
import { ViewMode } from '../../../../../../app/core/shared/view-mode.model';
import { listableObjectComponent } from '../../../../../../app/shared/object-collection/shared/listable-object/listable-object.decorator';
import { isEmpty, isNotEmpty } from '../../../../../../app/shared/empty.util';
import { getFirstSucceededRemoteDataWithNotEmptyPayload } from '../../../../../../app/core/shared/operators';
import {
  AccessStatusObject
} from '../../../../../../app/shared/object-collection/shared/badges/access-status-badge/access-status.model';
import { AccessConditionObject } from '../../../../../../app/core/submission/models/access-condition.model';

@listableObjectComponent('MasterThesisSearchResult', ViewMode.ListElement)
@Component({
  selector: 'ds-master-thesis-search-result-list-element',
  templateUrl: './master-thesis-search-result-list-element.component.html'
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
  }
}