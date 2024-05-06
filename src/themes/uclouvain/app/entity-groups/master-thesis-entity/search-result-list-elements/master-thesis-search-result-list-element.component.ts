import { Component, OnInit } from '@angular/core';
import { ItemSearchResultListElementComponent } from '../../../shared/object-list/search-result-list-element/item-search-result/item-types/item/item-search-result-list-element.component';
import { ViewMode } from '../../../../../../app/core/shared/view-mode.model';
import { listableObjectComponent } from '../../../../../../app/shared/object-collection/shared/listable-object/listable-object.decorator';
import { isEmpty, isNotEmpty } from '../../../../../../app/shared/empty.util';

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
  dsoDegreeLabels: string[];

  protected readonly isNotEmpty = isNotEmpty;

  ngOnInit() {
    super.ngOnInit();
    this.dsoDate = this.dso.firstMetadataValue('dc.date.issued');
    this.dsoDegreeLabels = this.dso.allMetadataValues('masterthesis.rootdegree.label');
    if (isEmpty(this.dsoDegreeLabels)) {
      this.dsoDegreeLabels = this.dso.allMetadataValues('masterthesis.degree.label');
    }
  }
}