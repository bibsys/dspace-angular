import { DatePipe, NgIf } from "@angular/common";
import { Component, Input } from "@angular/core";
import { TranslateModule } from "@ngx-translate/core";
import { Item } from "src/app/core/shared/item.model";

/**
 * Specific block used to render administrative metadata.
 */
@Component({
  selector: 'ds-administrative-page-details-block',
  template: `<div class='mb-2'>
    <dl class='mb-0'>
      <ng-container *ngIf="item.hasMetadata('dc.date.available')">
        <dt class="text-primary">{{ "item.page.details.label.created" | translate }}</dt>
        <dd>{{ item.firstMetadataValue('dc.date.available') | date:dateFormat}}</dd>
      </ng-container>
      <ng-container *ngIf="item.lastModified">
        <dt class="text-primary">{{ "item.page.details.label.updated" | translate }}</dt>
        <dd>{{ item.lastModified | date:dateFormat }}</dd>
      </ng-container>
    </dl>
  </div>`,
  standalone: true,
  imports: [
    NgIf,
    TranslateModule,
    DatePipe,
  ]
})
export class AdministrativePageDetailsBlock {
  @Input() item: Item;
  protected readonly dateFormat = 'yyyy-MM-dd HH:mm:ss';
}