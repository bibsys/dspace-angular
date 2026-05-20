import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { Context } from '../../../../../../../app/core/shared/context.model';
import { ViewMode } from '../../../../../../../app/core/shared/view-mode.model';
import { listableMetadataBlockComponent } from '../listable-metadata-block.decorator';
import { AbstractMetadataBlockComponent } from './abstract-metadata-block.component';

@listableMetadataBlockComponent('text::working-paper', ViewMode.StandalonePage, Context.Any, '*', 60)
@listableMetadataBlockComponent('text::report', ViewMode.StandalonePage, Context.Any, '*', 60)
@listableMetadataBlockComponent('text::book', ViewMode.StandalonePage, Context.Any, '*', 60)
@Component({
  template: `
      <ng-container *ngIf="hasValidMetadata('publication.numberOfPages')">
          <dt>{{ 'item.page.details.label.number-of-pages' | translate }}</dt>
          <dd>{{ item.firstMetadataValue("publication.numberOfPages") }} {{ 'item.page.details.label.pages' | translate }}</dd>
      </ng-container>
  `,
  standalone: true,
  imports: [NgIf, TranslateModule]
})
export class NumberOfPagesMetadataBlockComponent extends AbstractMetadataBlockComponent { }