import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { Context } from '../../../../../../../app/core/shared/context.model';
import { ViewMode } from '../../../../../../../app/core/shared/view-mode.model';
import { GenericItemPageFieldComponent } from '../../../../../../../app/item-page/simple/field-components/specific-field/generic/generic-item-page-field.component';
import { listableMetadataBlockComponent } from '../listable-metadata-block.decorator';
import { AbstractMetadataBlockComponent } from './abstract-metadata-block.component';

@listableMetadataBlockComponent('*', ViewMode.StandalonePage, Context.Any, '*', 10)
@Component({
  template: `
      <ng-container *ngIf="item.hasMetadata('dc.date.issued')">
          <dt>{{ 'item.page.details.label.date-issued' | translate }}</dt>
          <dd><ds-generic-item-page-field [item]='item' [fields]='["dc.date.issued"]'/></dd>
      </ng-container>
  `,
  standalone: true,
  imports: [NgIf, TranslateModule, GenericItemPageFieldComponent]
})
export class YearMetadataBlockComponent extends AbstractMetadataBlockComponent { }