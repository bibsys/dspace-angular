import { Component, Inject, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ItemListPreviewComponent as BaseComponent } from 'src/app/shared/object-list/my-dspace-result-list-element/item-list-preview/item-list-preview.component';
import { DSONameService } from '../../../../../../../app/core/breadcrumbs/dso-name.service';
import { AccessConditionObject } from '../../../../../../../app/core/submission/models/access-condition.model';
import { isEmpty } from '../../../../../../../app/shared/empty.util';
import { getFirstSucceededRemoteDataWithNotEmptyPayload } from '../../../../../../../app/core/shared/operators';
import {
  AccessStatusObject
} from '../../../../../../../app/shared/object-collection/shared/badges/access-status-badge/access-status.model';
import {
  PLACEHOLDER_PARENT_METADATA
} from '../../../../../../../app/shared/form/builder/ds-dynamic-form-ui/ds-dynamic-form-constants';
import { APP_CONFIG, AppConfig } from '../../../../../../../config/app-config.interface';

@Component({
    selector: 'ds-item-list-preview',
    templateUrl: './item-list-preview.component.html',
})
export class ItemListPreviewComponent extends BaseComponent implements OnInit {

  accessCondition: AccessConditionObject;
  authorMetadata = ['dc.contributor.author'];
  promoterMetadata = ['dc.contributor.advisor'];
  degreeCodes: string[];

  constructor(
    @Inject(APP_CONFIG) protected appConfig: AppConfig,
    public dsoNameService: DSONameService,
    protected translateService: TranslateService,
  ) {
    super(appConfig, dsoNameService);
  }

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

  getDefenseDate() {
    const parts: Array<String> = [];
    if (this.item.hasMetadata("masterthesis.session")) {
      parts.push(this.translateService.instant("session." + this.item.firstMetadataValue("masterthesis.session").toLowerCase()));
    }
    parts.push(this.item.hasMetadata("dc.date.issued")
      ? this.item.firstMetadataValue("dc.date.issued")
      : this.translateService.instant("mydspace.results.no-date")
    );
    return parts.join(" ");
  }

}
