import { Component, Input } from '@angular/core';
import { Item } from '../../../../../../../../app/core/shared/item.model';
import { isNotEmpty } from '../../../../../../../../app/shared/empty.util';

/** Component to display metadata list as bootstrap badges */
@Component({
  selector: 'ds-list-item-page-field',
  template: `
    <ng-container *ngVar="item?.allMetadata(fields) as mdValues">
        <div *ngIf="isNotEmpty(mdValues)" class="item-page-field">
            <ds-metadata-field-wrapper [label]="label | translate">
                <ul>
                    <li *ngFor="let mdValue of mdValues">
                        {{ mdValue.value }}
                    </li>
                </ul>
            </ds-metadata-field-wrapper>
        </div>
    </ng-container>
  `
})
export class ItemPageListFieldsComponent {

  @Input() item: Item;
  @Input() fields: string[];
  @Input() label: string;

  protected readonly isNotEmpty = isNotEmpty;
}