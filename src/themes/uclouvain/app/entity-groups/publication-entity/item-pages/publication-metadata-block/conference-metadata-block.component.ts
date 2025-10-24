import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { Context } from '../../../../../../../app/core/shared/context.model';
import { ViewMode } from '../../../../../../../app/core/shared/view-mode.model';
import { GenericItemPageFieldComponent } from '../../../../../../../app/item-page/simple/field-components/specific-field/generic/generic-item-page-field.component';
import { isNotEmpty } from '../../../../../../../app/shared/empty.util';
import { listableMetadataBlockComponent } from '../listable-metadata-block.decorator';
import { AbstractMetadataBlockComponent } from './abstract-metadata-block.component';

@listableMetadataBlockComponent('text::conference-speech', ViewMode.StandalonePage, Context.Any, '*', 25)
@Component({
  standalone: true,
  template: `
      <ng-container *ngIf="item.hasMetadata('publication.conference.name')">
        <dt>{{ 'item.page.details.label.conference' | translate }}</dt>
        <dd>
            <div class="conference-name"><ds-generic-item-page-field [item]="item" [fields]="['publication.conference.name']"/></div>
            <span class="conference-metadata conference-location" *ngIf="item.hasMetadata('publication.conference.location')">
                <i class="fas fa-arrow-turn-up fa-rotate-90 mx-2"></i>{{ item.firstMetadataValue("publication.conference.location") }}
            </span>
            <span class="conference-metadata conference-dates" *ngIf="isNotEmpty(conferenceDates)">
                <i class="fas fa-arrow-turn-up fa-rotate-90 mx-2"></i>
                <ng-container *ngIf="conferenceDates.length == 1; else multipleDates">{{ conferenceDates[0] }}</ng-container>
                <ng-template #multipleDates>{{ 'item.page.details.label.conference.from' | translate }} 
                    {{ conferenceDates[0] }} 
                    {{ 'item.page.details.label.conference.to' | translate }} 
                    {{ conferenceDates[1] }}
                </ng-template>
            </span>
        </dd>
      </ng-container>
  `,
  styles: `
    .conference-metadata {
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
export class ConferenceMetadataBlockComponent extends AbstractMetadataBlockComponent implements OnInit {

  protected conferenceDates: string[] = [];
  protected readonly isNotEmpty = isNotEmpty;

  ngOnInit() {
    this.conferenceDates = [
      this.item.firstMetadataValue("publication.conference.startDate"),
      this.item.firstMetadataValue("publication.conference.endDate"),
    ].filter(isNotEmpty);
  }

}
