import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { Context } from '../../../../../../../app/core/shared/context.model';
import { ViewMode } from '../../../../../../../app/core/shared/view-mode.model';
import { listableMetadataBlockComponent } from '../listable-metadata-block.decorator';
import { AbstractMetadataBlockComponent } from './abstract-metadata-block.component';

@listableMetadataBlockComponent('text::patent', ViewMode.StandalonePage, Context.Any, '*', 30)
@Component({
  template: `
      <ng-container *ngIf="item.hasMetadata('crispatent.patentOffice')">
          <dt>{{ 'item.page.details.label.patent-office' | translate }}</dt>
          <dd>{{ item.firstMetadataValue('crispatent.patentOffice') }}</dd>
      </ng-container>`,
  standalone: true,
  imports: [NgIf, TranslateModule]
})
export class PatentOfficeMetadataBlockComponent extends AbstractMetadataBlockComponent { }