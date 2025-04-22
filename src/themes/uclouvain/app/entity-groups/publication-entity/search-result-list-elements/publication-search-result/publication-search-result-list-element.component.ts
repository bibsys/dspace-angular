import { Component, Input, OnInit } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { Context } from "src/app/core/shared/context.model";
import { Item } from "src/app/core/shared/item.model";
import { getFirstSucceededRemoteDataWithNotEmptyPayload } from "src/app/core/shared/operators";
import { AccessConditionObject } from "src/app/core/submission/models/access-condition.model";
import { getItemPageRoute } from "src/app/item-page/item-page-routing-paths";
import { CollectionElementLinkType } from "src/app/shared/object-collection/collection-element-link.type";
import { AccessStatusObject } from "src/app/shared/object-collection/shared/badges/access-status-badge/access-status.model";

@Component({
  selector: 'ds-publication-search-result-list-element',
  templateUrl: './publication-search-result-list-element.component.html',
})
export class PublicationSearchResultListElementComponent implements OnInit {
    @Input() item: Item;

    @Input() linkType: CollectionElementLinkType;

    @Input() linkTypes = CollectionElementLinkType;

    @Input() context: Context;
  
    protected accessCondition: AccessConditionObject;
    protected itemTitle: string;
    protected itemPageRoute: string;

    constructor(
      protected translateService: TranslateService
    ) {}

    ngOnInit() {
      this.itemTitle = this.item.firstMetadataValue('dc.title') ?? this.translateService.instant('publication.list.element.title.placeholder');
      this.itemPageRoute = getItemPageRoute(this.item);
      if (this.item?.accessStatus) {
        this.item.accessStatus
          .pipe(getFirstSucceededRemoteDataWithNotEmptyPayload())
          .subscribe((access: AccessStatusObject) => {
            this.accessCondition = Object.assign(new AccessConditionObject(), {id: 0, name: access.status});
          });
      }
    }
}