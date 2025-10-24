import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { Context } from '../../../../../../../app/core/shared/context.model';
import { ViewMode } from '../../../../../../../app/core/shared/view-mode.model';
import { listableMetadataBlockComponent } from '../listable-metadata-block.decorator';
import { AbstractMetadataBlockComponent } from './abstract-metadata-block.component';

@listableMetadataBlockComponent('text::journal-article', ViewMode.StandalonePage, Context.Any, '*', 50)
@listableMetadataBlockComponent('text::book', ViewMode.StandalonePage, Context.Any, '*', 50)
@listableMetadataBlockComponent('text::book-part', ViewMode.StandalonePage, Context.Any, '*', 50)
@listableMetadataBlockComponent('text::conference-speech', ViewMode.StandalonePage, Context.Any, '*', 50)
@Component({
  template: `
      <ng-container *ngIf="item.hasMetadata('publication.publicationStatus')">
          <dt>{{ 'item.page.details.label.publication-status' | translate }}</dt>
          <dd>{{ 'item.page.details.values.publication-status.' + item.firstMetadataValue("publication.publicationStatus") | translate }}</dd>
      </ng-container>
  `,
  standalone: true,
  imports: [NgIf, TranslateModule]
})
export class PublicationStatusMetadataBlockComponent extends AbstractMetadataBlockComponent { }