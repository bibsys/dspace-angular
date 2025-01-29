import { AsyncPipe, NgClass, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
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
import { AccessConditionObject } from '../../../../../../../app/core/submission/models/access-condition.model';
import { isEmpty } from '../../../../../../../app/shared/empty.util';
import { getFirstSucceededRemoteDataWithNotEmptyPayload } from '../../../../../../../app/core/shared/operators';
import {
  AccessStatusObject
} from '../../../../../../../app/shared/object-collection/shared/badges/access-status-badge/access-status.model';
import { AccessConditionsComponent } from '../../../access-conditions/access-condition.component';
import {
  PLACEHOLDER_PARENT_METADATA
} from '../../../../../../../app/shared/form/builder/ds-dynamic-form-ui/ds-dynamic-form-constants';

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
        AccessConditionsComponent,
    ],
	standalone: true,
})
export class ItemListPreviewComponent extends BaseComponent implements OnInit {

  accessCondition: AccessConditionObject;
  authorMetadata = ['dc.contributor.author'];
  promoterMetadata = ['dc.contributor.advisor'];
  degreeCodes: string[];

  ngOnInit() {
    super.ngOnInit();
    if (isEmpty(this.degreeCodes)) {
      this.degreeCodes = this.item
        .allMetadataValues('masterthesis.degree.code')
        .filter(mdValue => mdValue !== PLACEHOLDER_PARENT_METADATA);
    }
    if (this.item?.accessStatus) {
      this.item.accessStatus
        .pipe(getFirstSucceededRemoteDataWithNotEmptyPayload())
        .subscribe((access: AccessStatusObject) => {
          this.accessCondition = Object.assign(new AccessConditionObject(), {id: 0, name: access.status});
        });
    }
  }

  protected readonly isEmpty = isEmpty;
}
