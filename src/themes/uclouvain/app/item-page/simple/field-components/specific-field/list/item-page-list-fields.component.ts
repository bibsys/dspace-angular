import { Component, Input } from '@angular/core';
import { Item } from '../../../../../../../../app/core/shared/item.model';
import { isNotEmpty } from '../../../../../../../../app/shared/empty.util';
import { NgFor, NgIf } from '@angular/common';
import { VarDirective } from 'src/app/shared/utils/var.directive';
import { TranslateModule } from '@ngx-translate/core';
import { MetadataFieldWrapperComponent } from 'src/app/shared/metadata-field-wrapper/metadata-field-wrapper.component';

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
  `,
  imports: [NgIf, VarDirective, TranslateModule, MetadataFieldWrapperComponent, NgFor],
  standalone: true,
})
export class ItemPageListFieldsComponent {

  @Input() item: Item;
  @Input() fields: string[];
  @Input() label: string;

  protected readonly isNotEmpty = isNotEmpty;
}