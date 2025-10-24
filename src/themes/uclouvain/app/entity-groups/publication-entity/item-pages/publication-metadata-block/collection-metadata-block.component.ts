import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { Context } from '../../../../../../../app/core/shared/context.model';
import { ViewMode } from '../../../../../../../app/core/shared/view-mode.model';
import {
  GenericItemPageFieldComponent
} from '../../../../../../../app/item-page/simple/field-components/specific-field/generic/generic-item-page-field.component';
import { listableMetadataBlockComponent } from '../listable-metadata-block.decorator';
import { AbstractMetadataBlockComponent } from './abstract-metadata-block.component';

@listableMetadataBlockComponent('text::working-paper', ViewMode.StandalonePage, Context.Any, '*', 40)
@listableMetadataBlockComponent('text::book', ViewMode.StandalonePage, Context.Any, '*', 40)
@listableMetadataBlockComponent('text::book-part', ViewMode.StandalonePage, Context.Any, '*', 40)
@listableMetadataBlockComponent('text::conference-speech', ViewMode.StandalonePage, Context.Any, '*', 40)
@Component({
  standalone: true,
  template: `
      <ng-container *ngIf="item.hasMetadata('publication.collection.name')">
        <dt>{{ 'item.page.details.label.collection' | translate }}</dt>
        <dd>
            <div class="collection-name"><ds-generic-item-page-field [item]="item" [fields]="['publication.collection.name']"/></div>
            <span class="collection-metadata collection-number" *ngIf="item.hasMetadata('publication.collection.number')">
                <i class="fas fa-arrow-turn-up fa-rotate-90 mx-2"></i>
                {{ 'item.page.details.label.collection.number' | translate }}: {{ item.firstMetadataValue("publication.collection.number") }}
            </span>
            <span class="collection-metadata collection-issn" *ngIf="item.hasMetadata('publication.collection.issn')">
                <i class="fas fa-arrow-turn-up fa-rotate-90 mx-2"></i>
                {{ 'item.page.details.label.collection.issn' | translate }}: {{ item.firstMetadataValue("publication.collection.issn") }}
            </span>
        </dd>
      </ng-container>
  `,
  styles: `
    .collection-metadata {
        display: block;
        color: var(--bs-secondary);
        font-style: italic;
    }
  `,
  imports: [
    NgIf,
    GenericItemPageFieldComponent,
    TranslateModule
  ]
})
export class CollectionMetadataBlockComponent extends AbstractMetadataBlockComponent {}
