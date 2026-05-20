import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { Context } from '../../../../../../../app/core/shared/context.model';
import { ViewMode } from '../../../../../../../app/core/shared/view-mode.model';
import { GenericItemPageFieldComponent } from '../../../../../../../app/item-page/simple/field-components/specific-field/generic/generic-item-page-field.component';
import { listableMetadataBlockComponent } from '../listable-metadata-block.decorator';
import { AbstractMetadataBlockComponent } from './abstract-metadata-block.component';

@listableMetadataBlockComponent('*', ViewMode.StandalonePage, Context.Any, '*', 20)
@Component({
  template: `
      <ng-container *ngIf="hasValidMetadata('dc.identifier.scopus')">
        <dt>{{ 'item.page.details.label.identifier-scopus' | translate }}</dt>
        <dd><ds-generic-item-page-field [item]='item' [fields]='["dc.identifier.scopus"]' [separator]="' ; '"/></dd>
      </ng-container>
  `,
  standalone: true,
  imports: [NgIf, TranslateModule, GenericItemPageFieldComponent]
})
export class IdentifierScopusMetadataBlockComponent extends AbstractMetadataBlockComponent { }