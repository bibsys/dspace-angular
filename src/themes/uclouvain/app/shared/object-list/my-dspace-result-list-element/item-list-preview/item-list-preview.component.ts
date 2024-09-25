import { Component, OnInit } from '@angular/core';
import { ItemListPreviewComponent as BaseComponent } from 'src/app/shared/object-list/my-dspace-result-list-element/item-list-preview/item-list-preview.component';
import { AccessConditionObject } from '../../../../../../../app/core/submission/models/access-condition.model';
import { isEmpty } from '../../../../../../../app/shared/empty.util';
import { getFirstSucceededRemoteDataWithNotEmptyPayload } from '../../../../../../../app/core/shared/operators';
import {
  AccessStatusObject
} from '../../../../../../../app/shared/object-collection/shared/badges/access-status-badge/access-status.model';

@Component({
    selector: 'ds-item-list-preview',
    templateUrl: './item-list-preview.component.html',
})
export class ItemListPreviewComponent extends BaseComponent implements OnInit {

  accessCondition: AccessConditionObject;
  authorMetadata = ['dc.contributor.author'];
  promoterMetadata = ['dc.contributor.advisor'];
  degreeCodes: string[];

  ngOnInit() {
    super.ngOnInit();
    if (isEmpty(this.degreeCodes)) {
      this.degreeCodes = this.item.allMetadataValues('masterthesis.degree.code');
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
