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
  template: '<ds-external-url-metadata-block [urls]="[url]" heading="arXiv ID" *ngIf="url"></ds-external-url-metadata-block>',
  standalone: true,
  imports: [GenericExternalUrlMetadataBlockComponent, NgIf]
})
export class IdentifierArxivMetadataBlockComponent extends AbstractMetadataBlockComponent implements OnInit {

  protected url: {link: URL, target?: string, content: string};

  ngOnInit() {
    const identifier = this.item.firstMetadataValue("dc.identifier.arxiv");
    if (isNotEmpty(identifier)) {
      const url = new URL('https://arxiv.org/abs/' + identifier);
      this.url = { link: url, content: identifier };
    }
  }
}