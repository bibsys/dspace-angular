import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Context } from '../../../../../../../app/core/shared/context.model';
import { ViewMode } from '../../../../../../../app/core/shared/view-mode.model';
import { isNotEmpty } from '../../../../../../../app/shared/empty.util';
import { listableMetadataBlockComponent } from '../listable-metadata-block.decorator';
import { AbstractMetadataBlockComponent } from './abstract-metadata-block.component';
import { GenericExternalUrlMetadataBlockComponent } from './generic-external-url-metadata-block.component';

@listableMetadataBlockComponent('*', ViewMode.StandalonePage, Context.Any, '*', 19)
@Component({
  template: '<ds-external-url-metadata-block [urls]="[url]" heading="Handle" *ngIf="url"></ds-external-url-metadata-block>',
  standalone: true,
  imports: [GenericExternalUrlMetadataBlockComponent, NgIf]
})
export class IdentifierHandleMetadataBlockComponent extends AbstractMetadataBlockComponent implements OnInit {

  protected url: {link: URL, target?: string, content: string};

  ngOnInit() {
    if (this.item.isArchived && this.item.handle) {
      const url = new URL('https://hdl.handle.net/' + this.item.handle);
      this.url = { link: url, content: url.href, target: 'dial' };
    }
  }
}