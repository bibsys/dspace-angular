import { NgIf } from "@angular/common";
import { Component, Input, OnInit } from "@angular/core";
import { RouterLink } from "@angular/router";
import { MetadataValue } from "src/app/core/shared/metadata.models";
import { getEntityPageRoute } from '../../../../../app/item-page/item-page-routing-paths';
import { isNotEmpty } from '../../../../../app/shared/empty.util';

@Component({
    selector: 'ds-item-link-view',
    template: `
        <a *ngIf="itemPageUrl" rel="noopener noreferrer" [routerLink]="itemPageUrl">{{ metadataValue.value }}</a>
        <span *ngIf="!itemPageUrl">{{ metadataValue.value }}</span>
    `,
    standalone: true,
  imports: [RouterLink, NgIf],
})
export class ItemLinkViewComponent implements OnInit {
    @Input() metadataValue: MetadataValue;
    @Input() relatedItemType?: string = null;  // the item type related to this metadataValue if authority exists.

    protected itemPageUrl: string;

    ngOnInit() {
      if (isNotEmpty(this.metadataValue?.authority)) {
        this.itemPageUrl = getEntityPageRoute(this.relatedItemType, this.metadataValue.authority);
      }
    }
}