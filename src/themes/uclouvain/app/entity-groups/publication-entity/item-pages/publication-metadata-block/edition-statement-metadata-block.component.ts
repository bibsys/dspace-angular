import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { Context } from '../../../../../../../app/core/shared/context.model';
import { ViewMode } from '../../../../../../../app/core/shared/view-mode.model';
import { listableMetadataBlockComponent } from '../listable-metadata-block.decorator';
import { AbstractMetadataBlockComponent } from './abstract-metadata-block.component';

@listableMetadataBlockComponent('text::book', ViewMode.StandalonePage, Context.Any, '*', 16)
@Component({
  template: `
      <ng-container *ngIf="item.hasMetadata('publication.editionStatement')">
          <dt>{{ 'item.page.details.label.edition-statement' | translate }}</dt>
          <dd>{{ item.firstMetadataValue("publication.editionStatement") }}</dd>
      </ng-container>
  `,
  standalone: true,
  imports: [NgIf, TranslateModule]
})
export class EditionStatementMetadataBlockComponent extends AbstractMetadataBlockComponent { }