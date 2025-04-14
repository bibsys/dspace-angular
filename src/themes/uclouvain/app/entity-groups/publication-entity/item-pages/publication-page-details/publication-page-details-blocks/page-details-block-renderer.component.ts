import { NgForOf, NgIf } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { Item } from 'src/app/core/shared/item.model';
import { GenericItemPageFieldComponent } from 'src/app/item-page/simple/field-components/specific-field/generic/generic-item-page-field.component';
import { isNotEmpty } from 'src/app/shared/empty.util';

/**
 * Component to render a given block configuration.
 * This component renders the header of the block and its metadata.
 * 
 * @author Michaël Pourbaix (michael.pourbaix@uclouvain.be)
 */
@Component({
  selector: 'ds-block-renderer',
  template: `<div *ngIf='shouldRender' class="mb-2">
    <h5 class='mb-0 pb-2 text-primary'><u>{{ blockHeading | translate }}:</u></h5>
    <dl class='row mb-0'>
      <ng-container *ngFor='let element of dataToRender;'>
        <div class="{{ element.class ?? 'col-12' }}">
          <dt class='text-primary'>{{ element.label | translate }}</dt>
          <dd>
            <ds-generic-item-page-field
                [item]='item'
                [fields]='[element.field]' />
          </dd>
        </div>
      </ng-container>
    </dl>
  </div>`,
  standalone: true,
  imports: [
    NgIf,
    TranslateModule,
    NgForOf,
    GenericItemPageFieldComponent,
  ],
})
export class PageDetailsBlockRendererComponent implements OnInit {
  @Input() data: { label: string, field: string, class?: string }[] = [];
  @Input() item: Item;
  @Input() blockHeading: string;

  protected dataToRender: { label: string, field: string, class?: string }[] = [];
  protected shouldRender: boolean;

  ngOnInit(): void {
    if (this.data.length === 0) {
      this.shouldRender = false;
      return;
    }
    this.dataToRender = this.data.filter(element => this.item.hasMetadata(element.field));
    this.shouldRender = isNotEmpty(this.dataToRender);
  }
}