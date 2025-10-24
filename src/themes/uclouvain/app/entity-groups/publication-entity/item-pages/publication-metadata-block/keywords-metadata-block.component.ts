import { NgForOf, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { Context } from '../../../../../../../app/core/shared/context.model';
import { ViewMode } from '../../../../../../../app/core/shared/view-mode.model';
import { listableMetadataBlockComponent } from '../listable-metadata-block.decorator';
import { AbstractMetadataBlockComponent } from './abstract-metadata-block.component';

@listableMetadataBlockComponent('*', ViewMode.StandalonePage, Context.Any, '*', 70)
@Component({
  template: `
    <ng-container *ngIf="item.hasMetadata('dc.subject')">
      <dt>{{ 'item.page.details.label.subjects' | translate }}</dt>
      <dd>
        <ul class="list-unstyled m-0">
          <li *ngFor="let keyword of item.allMetadata(['dc.subject'])" class="mr-2 badge badge-secondary py-1">
            <i class="fa fa-tag mr-1"></i>{{keyword.value}}
          </li>
        </ul>
      </dd>
	  </ng-container>
  `,
  styles: ['.badge {max-width: 100%;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;}'],
  standalone: true,
  imports: [NgIf, TranslateModule, NgForOf],
})
export class KeywordsMetadataBlockComponent extends AbstractMetadataBlockComponent { }