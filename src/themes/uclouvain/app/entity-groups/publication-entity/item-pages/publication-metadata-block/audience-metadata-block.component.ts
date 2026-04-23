import {NgForOf, NgIf} from '@angular/common';
import {Component, OnInit} from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { Context } from '../../../../../../../app/core/shared/context.model';
import { ViewMode } from '../../../../../../../app/core/shared/view-mode.model';
import { GenericItemPageFieldComponent } from '../../../../../../../app/item-page/simple/field-components/specific-field/generic/generic-item-page-field.component';
import { listableMetadataBlockComponent } from '../listable-metadata-block.decorator';
import { AbstractMetadataBlockComponent } from './abstract-metadata-block.component';

@listableMetadataBlockComponent('*', ViewMode.StandalonePage, Context.Any, '*', 11)
@Component({
  template: `
    <ng-container *ngIf="item.hasMetadata('dc.audience')">
      <dt>{{ 'item.page.details.label.audience' | translate }}</dt>
      <dd>
        <ul class="list-unstyled m-0">
          <li *ngFor="let audience of item.allMetadata(['dc.audience'])">
            {{ 'item.page.details.label.audience.' + audience.value | translate }}
          </li>
        </ul>
      </dd>
    </ng-container>
  `,
  standalone: true,
  imports: [NgIf, TranslateModule, GenericItemPageFieldComponent, NgForOf]
})
export class AudienceMetadataBlockComponent extends AbstractMetadataBlockComponent{}

