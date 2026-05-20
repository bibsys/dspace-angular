import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { Context } from '../../../../../../../app/core/shared/context.model';
import { ViewMode } from '../../../../../../../app/core/shared/view-mode.model';
import { GenericItemPageFieldComponent } from '../../../../../../../app/item-page/simple/field-components/specific-field/generic/generic-item-page-field.component';
import { listableMetadataBlockComponent } from '../listable-metadata-block.decorator';
import { AbstractMetadataBlockComponent } from './abstract-metadata-block.component';

@listableMetadataBlockComponent('text::journal-article', ViewMode.StandalonePage, Context.Any, '*', 31)
@listableMetadataBlockComponent('text::book', ViewMode.StandalonePage, Context.Any, '*', 31)
@listableMetadataBlockComponent('text::book-part', ViewMode.StandalonePage, Context.Any, '*', 31)
@listableMetadataBlockComponent('text::conference-speech', ViewMode.StandalonePage, Context.Any, '*', 31)
@listableMetadataBlockComponent('text::report', ViewMode.StandalonePage, Context.Any, '*', 31)
@Component({
  standalone: true,
  template: `
      <ng-container *ngIf="hasValidMetadata('publication.editor.name')">
        <dt>{{ 'item.page.details.label.publisher' | translate }}</dt>
        <dd>
            <div class="editor-name"><ds-generic-item-page-field [item]="item" [fields]="['publication.editor.name']"/></div>
            <span class="editor-metadata editor-location" *ngIf="hasValidMetadata('publication.editor.location')">
                <i class="fas fa-arrow-turn-up fa-rotate-90 mx-2"></i>{{ item.firstMetadataValue("publication.editor.location") }}
            </span>
        </dd>
      </ng-container>
  `,
  styles: `
    .editor-metadata {
        display: block;
        color: var(--bs-secondary);
        font-style: italic;
    }
  `,
  imports: [
    NgIf,
    GenericItemPageFieldComponent,
    TranslateModule
  ]
})
export class PublisherMetadataBlockComponent extends AbstractMetadataBlockComponent {}
