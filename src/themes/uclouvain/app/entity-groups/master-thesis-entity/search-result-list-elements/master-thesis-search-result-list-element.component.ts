import { Component, OnInit } from '@angular/core';
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