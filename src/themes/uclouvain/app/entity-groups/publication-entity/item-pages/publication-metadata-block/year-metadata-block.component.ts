import { NgIf } from '@angular/common';
import {Component, OnInit} from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { Context } from '../../../../../../../app/core/shared/context.model';
import { ViewMode } from '../../../../../../../app/core/shared/view-mode.model';
import { GenericItemPageFieldComponent } from '../../../../../../../app/item-page/simple/field-components/specific-field/generic/generic-item-page-field.component';
import { listableMetadataBlockComponent } from '../listable-metadata-block.decorator';
import { AbstractMetadataBlockComponent } from './abstract-metadata-block.component';
import {getItemPageRoute} from "../../../../../../../app/item-page/item-page-routing-paths";

@listableMetadataBlockComponent('*', ViewMode.StandalonePage, Context.Any, '*', 12)
@Component({
  template: `
      <ng-container *ngIf="item.hasMetadata('dc.date.issued')">
          <dt>{{ 'item.page.details.label.date-issued' | translate }}</dt>
          <dd>{{ dsoDate }}</dd>
      </ng-container>
  `,
  standalone: true,
  imports: [NgIf, TranslateModule, GenericItemPageFieldComponent]
})
export class YearMetadataBlockComponent extends AbstractMetadataBlockComponent implements OnInit {

  protected dsoDate: string;

  ngOnInit() {
    this.dsoDate = this.item.firstMetadataValue('dc.date.issued');

    if (this.dsoDate) {
      const date = new Date(this.dsoDate);
      this.dsoDate = date.getFullYear().toString();
    }
  }
}
