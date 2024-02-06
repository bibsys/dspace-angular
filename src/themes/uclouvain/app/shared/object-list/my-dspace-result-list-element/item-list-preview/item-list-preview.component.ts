import { AsyncPipe, NgClass, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { MetadataLinkViewComponent } from 'src/app/shared/metadata-link-view/metadata-link-view.component';
import { ThemedBadgesComponent } from 'src/app/shared/object-collection/shared/badges/themed-badges.component';
import { ItemCollectionComponent } from 'src/app/shared/object-collection/shared/mydspace-item-collection/item-collection.component';
import { ItemCorrectionComponent } from 'src/app/shared/object-collection/shared/mydspace-item-correction/item-correction.component';
import { ItemSubmitterComponent } from 'src/app/shared/object-collection/shared/mydspace-item-submitter/item-submitter.component';
import { ItemListPreviewComponent as BaseComponent } from 'src/app/shared/object-list/my-dspace-result-list-element/item-list-preview/item-list-preview.component';
import { AdditionalMetadataComponent } from 'src/app/shared/object-list/search-result-list-element/additional-metadata/additional-metadata.component';
import { TruncatablePartComponent } from 'src/app/shared/truncatable/truncatable-part/truncatable-part.component';
import { TruncatableComponent } from 'src/app/shared/truncatable/truncatable.component';
import { ThemedThumbnailComponent } from 'src/app/thumbnail/themed-thumbnail.component';

@Component({
    selector: 'ds-themed-item-list-preview',
    templateUrl: './item-list-preview.component.html',
    imports: [
        ThemedThumbnailComponent,
        ThemedBadgesComponent,
        TruncatableComponent,
        TruncatablePartComponent,
        MetadataLinkViewComponent,
        AdditionalMetadataComponent,
        ItemCorrectionComponent,
        ItemSubmitterComponent,
        ItemCollectionComponent,
        NgIf,
        NgClass,
        NgFor,
        TranslateModule,
        AsyncPipe,
    ],
	standalone: true,
})
export class ItemListPreviewComponent extends BaseComponent {}
