import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Context } from '../../../../../../../app/core/shared/context.model';
import { ViewMode } from '../../../../../../../app/core/shared/view-mode.model';
import { isNotEmpty } from '../../../../../../../app/shared/empty.util';
import { listableMetadataBlockComponent } from '../listable-metadata-block.decorator';
import { AbstractMetadataBlockComponent } from './abstract-metadata-block.component';
import { GenericExternalUrlMetadataBlockComponent } from './generic-external-url-metadata-block.component';


@listableMetadataBlockComponent('*', ViewMode.StandalonePage, Context.Any, '*', 20)
@Component({
  template: `
      <ng-container *ngIf="isNotEmpty(identifier)">
          <ds-external-url-metadata-block [urls]="[url]" heading="ISBN" *ngIf="url; else noLink"></ds-external-url-metadata-block>
          <ng-template #noLink>
              <dt>ISBN</dt>
              <dd>{{ identifier }}</dd>
          </ng-template>
      </ng-container>`,
  standalone: true,
  imports: [GenericExternalUrlMetadataBlockComponent, NgIf]
})
export class IdentifierISBNMetadataBlockComponent extends AbstractMetadataBlockComponent implements OnInit {

  protected identifier: string;
  protected url: {link: URL, target?: string, content: string};
  protected readonly isNotEmpty = isNotEmpty;

  ngOnInit() {
    this.identifier = this.item.firstMetadataValue("dc.identifier.isbn");
    if (isNotEmpty(this.identifier) && this.item.hasMetadata('dc.relation.isbn')) {
      this.url = {link: new URL(this.item.firstMetadataValue('dc.relation.isbn')), content: this.identifier};
    }
  }

}
