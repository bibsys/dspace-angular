import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { Context } from '../../../../../../../app/core/shared/context.model';
import { ViewMode } from '../../../../../../../app/core/shared/view-mode.model';
import { listableMetadataBlockComponent } from '../listable-metadata-block.decorator';
import { AbstractMetadataBlockComponent } from './abstract-metadata-block.component';
import { ItemLinkViewComponent } from 'src/themes/uclouvain/app/shared/item-link-view/item-link-view.component';

@listableMetadataBlockComponent('text::journal-article', ViewMode.StandalonePage, Context.Any, '*', 30)
@listableMetadataBlockComponent('text::conference-speech', ViewMode.StandalonePage, Context.Any, '*', 30)
@Component({
  template: `
      <ng-container *ngIf="hasValidMetadata('dc.relation.journal')">
        <dt>{{ 'item.page.details.label.host-journal' | translate }}</dt>
        <dd>
            <div class="journal-name"><ds-item-link-view [metadataValue]="item.firstMetadata('dc.relation.journal')"/></div>
            <span class="journal-metadata journal-volume" *ngIf="hasValidMetadata('publication.serial.volume')">
                <i class="fas fa-arrow-turn-up fa-rotate-90 mx-2"></i>
                {{ 'item.page.details.label.host-journal.volume' | translate }}: {{ item.firstMetadataValue("publication.serial.volume") }}
            </span>
            <span class="journal-metadata journal-issue" *ngIf="hasValidMetadata('publication.serial.issue')">
                <i class="fas fa-arrow-turn-up fa-rotate-90 mx-2"></i>
                {{ 'item.page.details.label.host-journal.issue' | translate }}: {{ item.firstMetadataValue("publication.serial.issue") }}
            </span>
            <span class="journal-metadata journal-pages" *ngIf="hasValidMetadata('publication.serial.pages')">
                <i class="fas fa-arrow-turn-up fa-rotate-90 mx-2"></i>
                {{ 'item.page.details.label.host-journal.pages' | translate }}: {{ item.firstMetadataValue("publication.serial.pages") }}
            </span>
            <span class="journal-metadata journal-date" *ngIf="hasValidMetadata('publication.serial.dateIssued')">
                <i class="fas fa-arrow-turn-up fa-rotate-90 mx-2"></i>
                {{ 'item.page.details.label.host-journal.date' | translate }}: {{ item.firstMetadataValue("publication.serial.dateIssued") }}
            </span>
            <span class="journal-metadata journal-issn" *ngIf="hasValidMetadata('publication.serial.issn')">
                <i class="fas fa-arrow-turn-up fa-rotate-90 mx-2"></i>
                {{ 'item.page.details.label.host-journal.issn' | translate }}: {{ item.firstMetadataValue("publication.serial.issn") }}
            </span>
            <span class="journal-metadata journal-eissn" *ngIf="hasValidMetadata('publication.serial.eissn')">
                <i class="fas fa-arrow-turn-up fa-rotate-90 mx-2"></i>
                {{ 'item.page.details.label.host-journal.eissn' | translate }}: {{ item.firstMetadataValue("publication.serial.eissn") }}
            </span>
        </dd>
      </ng-container>
  `,
  styles: `
    .journal-metadata {
        display: block;
        color: var(--bs-secondary);
        font-style: italic;
    }
  `,
  standalone: true,
  imports: [
    NgIf,
    TranslateModule,
    ItemLinkViewComponent,
  ]
})
export class HostJournalMetadataBlockComponent extends AbstractMetadataBlockComponent {}
