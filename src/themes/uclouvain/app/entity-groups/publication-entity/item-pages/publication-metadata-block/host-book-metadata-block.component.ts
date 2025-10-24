import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { Context } from '../../../../../../../app/core/shared/context.model';
import { ViewMode } from '../../../../../../../app/core/shared/view-mode.model';
import { GenericItemPageFieldComponent } from '../../../../../../../app/item-page/simple/field-components/specific-field/generic/generic-item-page-field.component';
import { listableMetadataBlockComponent } from '../listable-metadata-block.decorator';
import { AbstractMetadataBlockComponent } from './abstract-metadata-block.component';

@listableMetadataBlockComponent('text::book-part', ViewMode.StandalonePage, Context.Any, '*', 30)
@listableMetadataBlockComponent('text::conference-speech', ViewMode.StandalonePage, Context.Any, '*', 30)
@Component({
  template: `
      <ng-container *ngIf="item.hasMetadata('publication.host.title')">
        <dt>{{ 'item.page.details.label.host-book' | translate }}</dt>
        <dd>
            <div class="book-name"><ds-generic-item-page-field [item]='item' [fields]='["publication.host.title"]'/></div>
            <span class="book-metadata book-statement d-flex" *ngIf="item.hasMetadata('publication.host.editionStatement')">
                <div><i class="fas fa-arrow-turn-up fa-rotate-90 mx-2"></i></div>
                <div>{{ item.firstMetadataValue("publication.host.editionStatement") }}</div>
            </span>
            <span class="book-metadata book-authors d-flex" *ngIf="item.hasMetadata('publication.host.authors')">
                <div><i class="fas fa-arrow-turn-up fa-rotate-90 mx-2"></i></div>
                <div>{{ 'item.page.details.label.host-book.authors' | translate }}: {{ item.firstMetadataValue("publication.host.authors") }}</div>
            </span>
            <span class="book-metadata book-pages" *ngIf="item.hasMetadata('publication.host.pages')">
                <i class="fas fa-arrow-turn-up fa-rotate-90 mx-2"></i>
                {{ 'item.page.details.label.host-book.pages' | translate }}: {{ item.firstMetadataValue("publication.host.pages") }}
            </span>
            <span class="book-metadata book-date" *ngIf="item.hasMetadata('publication.host.dateIssued')">
                <i class="fas fa-arrow-turn-up fa-rotate-90 mx-2"></i>
                {{ 'item.page.details.label.host-book.date' | translate }}: {{ item.firstMetadataValue("publication.host.dateIssued") }}
            </span>
        </dd>
      </ng-container>
      <ng-container *ngIf="item.firstMetadataValue('publication.host.isbn')">
          <dt>{{ 'item.page.details.label.isbn' | translate }}</dt>
          <dd><ds-generic-item-page-field [item]='item' [fields]='["publication.host.isbn"]'/></dd>
      </ng-container>
      <ng-container *ngIf="item.firstMetadataValue('publication.book.peerReviewed')">
        <dt>{{ 'journal.listelement.peerreviewed' | translate }}</dt>
        <dd>{{ 'journal.listelement.peerreviewed.true' | translate }}</dd>
      </ng-container>
  `,
  styles: `
    .book-metadata {
        display: block;
        color: var(--bs-secondary);
        font-style: italic;
    }
  `,
  standalone: true,
  imports: [
    NgIf,
    GenericItemPageFieldComponent,
    TranslateModule
  ]
})
export class HostBookMetadataBlockComponent extends AbstractMetadataBlockComponent {}
