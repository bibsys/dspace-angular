import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { Context } from '../../../../../../../app/core/shared/context.model';
import { ViewMode } from '../../../../../../../app/core/shared/view-mode.model';
import { listableMetadataBlockComponent } from '../listable-metadata-block.decorator';
import { AbstractMetadataBlockComponent } from './abstract-metadata-block.component';

@listableMetadataBlockComponent('*', ViewMode.StandalonePage, Context.Any, '*', 15)
@Component({
  template: `
      <ng-container *ngIf="item.hasMetadata('dc.language.iso')">
          <dt>{{ 'item.page.details.label.language' | translate }}</dt>
          <dd>{{ 'languages.iso-639-2.' + item.firstMetadataValue("dc.language.iso") | translate }}</dd>
      </ng-container>
  `,
  standalone: true,
  imports: [NgIf, TranslateModule]
})
export class LanguageStatusMetadataBlockComponent extends AbstractMetadataBlockComponent { }