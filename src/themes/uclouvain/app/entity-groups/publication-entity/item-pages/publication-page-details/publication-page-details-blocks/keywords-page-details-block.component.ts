import { NgForOf, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { Item } from 'src/app/core/shared/item.model';

@Component({
  selector: 'ds-keywords-page-details-block',
  template: `<div *ngIf="item.hasMetadata('dc.subject')">
    <dt class="text-primary">{{ 'item.page.subject' | translate }}</dt>
    <dd>
      <ul class="list-unstyled m-0">
        <li *ngFor="let keyword of item.allMetadata(['dc.subject'])" class="d-inline mr-2">
          <span class="badge badge-secondary mt-1">
            <i class="fa fa-tag"></i>
            {{keyword.value}}
          </span>
        </li>
      </ul>
    </dd>
	</div>`,
  styles: ['.badge {max-width: 100%;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;}'],
  standalone: true,
  imports: [
    NgIf,
    TranslateModule,
    NgForOf,
  ],
})
export class KeywordsPageDetailsBlock {
  @Input() item: Item;
}