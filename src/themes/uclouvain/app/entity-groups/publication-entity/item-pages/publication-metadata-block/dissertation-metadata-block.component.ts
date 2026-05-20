import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { Context } from '../../../../../../../app/core/shared/context.model';
import { ViewMode } from '../../../../../../../app/core/shared/view-mode.model';
import { listableMetadataBlockComponent } from '../listable-metadata-block.decorator';
import { AbstractMetadataBlockComponent } from './abstract-metadata-block.component';

@listableMetadataBlockComponent('text::thesis', ViewMode.StandalonePage, Context.Any, '*', 50)
@Component({
  template: `
      <ng-container *ngIf="hasValidMetadata('dissertation.defenseDate')">
          <dt>{{ 'item.page.details.label.dissertation.defense-date' | translate }}</dt>
          <dd>{{ item.firstMetadataValue("dissertation.defenseDate") }}</dd>
      </ng-container>
      <ng-container *ngIf="hasValidMetadata('dissertation.degree.name')">
          <dt>{{ 'item.page.details.label.dissertation.degree-name' | translate }}</dt>
          <dd>{{ item.firstMetadataValue("dissertation.degree.name") }}</dd>
      </ng-container>
  `,
  standalone: true,
  imports: [NgIf, TranslateModule]
})
export class DissertationMetadataBlockComponent extends AbstractMetadataBlockComponent { }