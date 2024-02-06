import { Component } from '@angular/core';
import { listableObjectComponent } from '../../../../../../../../../app/shared/object-collection/shared/listable-object/listable-object.decorator';
import { ViewMode } from '../../../../../../../../../app/core/shared/view-mode.model';
import { ItemSearchResult } from '../../../../../../../../../app/shared/object-collection/shared/item-search-result.model';
import { ItemSearchResultListElementComponent as BaseComponent } from '../../../../../../../../../app/shared/object-list/search-result-list-element/item-search-result/item-types/item/item-search-result-list-element.component';
import { Context } from '../../../../../../../../../app/core/shared/context.model';
import { ThemedBadgesComponent } from 'src/app/shared/object-collection/shared/badges/themed-badges.component';
import { TruncatableComponent } from 'src/app/shared/truncatable/truncatable.component';
import { TruncatablePartComponent } from 'src/app/shared/truncatable/truncatable-part/truncatable-part.component';
import { MetadataLinkViewComponent } from 'src/app/shared/metadata-link-view/metadata-link-view.component';
import { AdditionalMetadataComponent } from 'src/app/shared/object-list/search-result-list-element/additional-metadata/additional-metadata.component';
import { MetricBadgesComponent } from 'src/app/shared/object-list/metric-badges/metric-badges.component';
import { MetricDonutsComponent } from 'src/app/shared/object-list/metric-donuts/metric-donuts.component';
import { AsyncPipe, NgClass, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ThemedThumbnailComponent } from 'src/app/thumbnail/themed-thumbnail.component';

@listableObjectComponent('PublicationSearchResult', ViewMode.ListElement, Context.Any, 'custom')
@listableObjectComponent(ItemSearchResult, ViewMode.ListElement, Context.Any, 'custom')
@Component({
  selector: 'ds-item-search-result-list-element',
  styleUrls: ['./item-search-result-list-element.component.scss'],
  templateUrl: './item-search-result-list-element.component.html',
  imports: [
    ThemedThumbnailComponent,
    ThemedBadgesComponent,
    TruncatableComponent,
    TruncatablePartComponent,
    MetadataLinkViewComponent,
    AdditionalMetadataComponent,
    MetricBadgesComponent,
    MetricDonutsComponent,
    NgIf,
    NgClass,
    RouterLink,
    AsyncPipe,
  ],
	standalone: true,
})
export class ItemSearchResultListElementComponent extends BaseComponent {}
