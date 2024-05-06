import { Component, Input } from '@angular/core';
import { Item } from '../../../../../../../../app/core/shared/item.model';
import { isNotEmpty } from '../../../../../../../../app/shared/empty.util';

/** Component to display metadata list as bootstrap badges */
@Component({
  selector: 'ds-tag-item-page-field',
  template: `
    <ng-container *ngVar="item?.allMetadata(fields) as tags">
        <div *ngIf="isNotEmpty(tags)" class="item-page-field">
            <ds-metadata-field-wrapper [label]="label | translate">
                <ul class="list-unstyled">
                    <li *ngFor="let tag of tags" class="d-inline mr-2">
                        <span class="badge badge-secondary">
                            <i *ngIf="showIcon" class="{{ icon }} mr-1"></i>
                            {{ tag.value }}
                        </span>
                    </li>
                </ul>
            </ds-metadata-field-wrapper>
        </div>
    </ng-container>
  `
})
export class ItemPageTagFieldsComponent {

  @Input() item: Item;
  @Input() fields: string[];
  @Input() label: string;
  @Input() showIcon: boolean = true;
  @Input() icon: string = 'fa fa-tag';

  protected readonly isNotEmpty = isNotEmpty;
}