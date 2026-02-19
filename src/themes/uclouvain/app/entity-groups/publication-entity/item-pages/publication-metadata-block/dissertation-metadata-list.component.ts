import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { Context } from '../../../../../../../app/core/shared/context.model';
import { ViewMode } from '../../../../../../../app/core/shared/view-mode.model';
import { listableMetadataBlockComponent } from '../listable-metadata-block.decorator';
import { AbstractMetadataBlockComponent } from './abstract-metadata-block.component';

@listableMetadataBlockComponent('text::thesis', ViewMode.ListElement, Context.MyDSpaceWaitingController, 'uclouvain', 50)
@listableMetadataBlockComponent('text::thesis', ViewMode.ListElement, Context.MyDSpaceValidation, 'uclouvain', 50)
@Component({
  template: `
      <div class="row mt-1" *ngIf="item.hasMetadata('dissertation.faculty')">
          <label class="col-6 col-md-3 font-weight-bold p-0 m-0">{{ 'item.page.details.label.dissertation.faculty' | translate }}:</label>
          <span class="col">{{ item.firstMetadataValue("dissertation.faculty") }}</span>
      </div>
      <div class="row mt-1" *ngIf="item.hasMetadata('dissertation.degree.name')">
          <label class="col-6 col-md-3 font-weight-bold p-0 m-0">{{ 'item.page.details.label.dissertation.degree-name' | translate }}:</label>
          <span class="col">{{ item.firstMetadataValue("dissertation.degree.name") }}</span>
      </div>
      <div class="row mt-1" *ngIf="item.hasMetadata('dissertation.defenseDate')">
        <label class="col-6 col-md-3 font-weight-bold p-0 m-0">{{ 'item.page.details.label.dissertation.defense-date' | translate }}:</label>
        <span class="col">{{ item.firstMetadataValue("dissertation.defenseDate") }}</span>
      </div>
  `,
  standalone: true,
  imports: [NgIf, TranslateModule]
})
export class DissertationMetadataListComponent extends AbstractMetadataBlockComponent { }