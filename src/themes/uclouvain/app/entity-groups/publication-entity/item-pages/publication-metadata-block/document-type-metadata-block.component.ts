import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Context } from '../../../../../../../app/core/shared/context.model';
import { ViewMode } from '../../../../../../../app/core/shared/view-mode.model';
import { listableMetadataBlockComponent } from '../listable-metadata-block.decorator';
import { AbstractMetadataBlockComponent } from './abstract-metadata-block.component';

@listableMetadataBlockComponent('*', ViewMode.StandalonePage, Context.Any, '*', 10)
@Component({
  template: `
      <ng-container *ngIf="item.hasMetadata('dc.type')">
          <dt>{{ 'item.page.details.label.document-type' | translate }}</dt>
          <dd>
              <span class="main-type">{{ item.firstMetadataValue("dc.type") }}</span>
          </dd>
      </ng-container>
  `,
  standalone: true,
  imports: [NgIf, TranslateModule]
})
export class DocumentTypeMetadataBlockComponent extends AbstractMetadataBlockComponent {}
