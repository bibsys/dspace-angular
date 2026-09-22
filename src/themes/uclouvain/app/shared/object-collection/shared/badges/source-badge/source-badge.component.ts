import { NgIf } from '@angular/common';
import { Component, Input, OnInit } from "@angular/core";
import { TranslateModule } from "@ngx-translate/core";
import { Context } from "src/app/core/shared/context.model";
import { DSpaceObject } from '../../../../../../../../app/core/shared/dspace-object.model';
import { Item } from '../../../../../../../../app/core/shared/item.model';


@Component({
  selector: 'ds-source-badge',
  styles: ['.badge {font-size: 0.8rem; line-height: 1.5; }'],
  template: `<span class="badge badge-secondary px-2 py-1" *ngIf="source">{{ source }}</span>`,
  standalone: true,
  imports: [
    NgIf,
    TranslateModule
  ],
})
export class SourceBadge implements OnInit {
  @Input() context: Context;
  @Input() object: DSpaceObject;

  protected source: string | null = null;

  ngOnInit() {

    if (this.object instanceof Item) {
      const item = this.object as Item;
      if (item.hasMetadata("dcterms.source")) {
        this.source = item.firstMetadataValue("dcterms.source");
      }
    }
  }
}
  