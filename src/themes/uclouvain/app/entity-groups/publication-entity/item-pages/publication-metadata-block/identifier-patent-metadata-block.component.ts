import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { Context } from '../../../../../../../app/core/shared/context.model';
import { ViewMode } from '../../../../../../../app/core/shared/view-mode.model';
import { GenericItemPageFieldComponent } from '../../../../../../../app/item-page/simple/field-components/specific-field/generic/generic-item-page-field.component';
import { listableMetadataBlockComponent } from '../listable-metadata-block.decorator';
import { AbstractMetadataBlockComponent } from './abstract-metadata-block.component';

@listableMetadataBlockComponent('text::patent', ViewMode.StandalonePage, Context.Any, '*', 20)
@Component({
  template: `
      <ng-container *ngIf="item.hasMetadata('dc.identifier.ipc')">
        <dt>{{ 'item.page.details.label.identifier-ipc' | translate }}</dt>
        <dd><ds-generic-item-page-field [item]='item' [fields]='["dc.identifier.ipc"]' [separator]="' ; '"/></dd>
      </ng-container>
      <ng-container *ngIf="item.hasMetadata('dc.identifier.ecla')">
          <dt>{{ 'item.page.details.label.identifier-ecla' | translate }}</dt>
          <dd><ds-generic-item-page-field [item]='item' [fields]='["dc.identifier.ecla"]' [separator]="' ; '"/></dd>
      </ng-container>
      <ng-container *ngIf="item.hasMetadata('dc.identifier.patentID')">
          <dt>{{ 'item.page.details.label.identifier-patentID' | translate }}</dt>
          <dd><ds-generic-item-page-field [item]='item' [fields]='["dc.identifier.patentID"]' [separator]="' ; '"/></dd>
      </ng-container>
      <ng-container *ngIf="item.hasMetadata('dc.identifier.priorityNumber')">
          <dt>{{ 'item.page.details.label.identifier-priorityNumber' | translate }}</dt>
          <dd><ds-generic-item-page-field [item]='item' [fields]='["dc.identifier.priorityNumber"]' [separator]="' ; '"/></dd>
      </ng-container>
  `,
  standalone: true,
  imports: [NgIf, TranslateModule, GenericItemPageFieldComponent]
})
export class IdentifierPatentMetadataBlockComponent extends AbstractMetadataBlockComponent { }