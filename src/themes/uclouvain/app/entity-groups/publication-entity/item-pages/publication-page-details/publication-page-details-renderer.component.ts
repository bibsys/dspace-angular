import { NgForOf, NgIf } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Item } from 'src/app/core/shared/item.model';
import { isNotEmpty } from 'src/app/shared/empty.util';
import { environment } from 'src/environments/environment';
import { PageDetailsBlockRendererComponent } from './publication-page-details-blocks/page-details-block-renderer.component';
import { TranslateModule } from '@ngx-translate/core';
import { KeywordsPageDetailsBlock } from './publication-page-details-blocks/keywords-page-details-block.component';
import { AdministrativePageDetailsBlock } from './publication-page-details-blocks/administrative-page-details-block.component';
import { DefaultPageDetailsComponent } from './default-page-details.component';

/**
 * Component used to render all data blocks for a given item using its publication type.
 * Each publication type has a configured set of blocks to render (see config.yml).
 * At the end, we also add the 'administrative block'.
 * 
 * @author Michaël Pourbaix (michael.pourbaix@uclouvain.be)
 */
@Component({
  selector: 'ds-publication-page-details-renderer',
  template: `<div class='d-flex flex-column h-100'> 
    <ng-container *ngIf='isNotEmpty(targetConfig); else defaultPage'>
      <ng-container *ngFor='let blockId of targetConfig'>
        <ds-block-renderer [item]='item' [blockHeading]="blocksConfig[blockId]['heading']" [data]="blocksConfig[blockId]['data']" />
      </ng-container>
    </ng-container>
    <div>
      <h5><u>{{ "item.page.details.heading.administrative" | translate }}:</u></h5>
      <ds-keywords-page-details-block [item]="item"/>
      <ds-administrative-page-details-block [item]='item' />
    </div>
  </div>
  <ng-template #defaultPage>
    <ds-default-page-details [item]='item'/>
  </ng-template>`,
  standalone: true,
  imports: [
    NgIf,
    PageDetailsBlockRendererComponent,
    NgForOf,
    TranslateModule,
    KeywordsPageDetailsBlock,
    AdministrativePageDetailsBlock,
    DefaultPageDetailsComponent,
  ]
})
export class PublicationPageDetailsRendererComponent implements OnInit {

  @Input() item: Item;

  protected isNotEmpty = isNotEmpty;
  protected targetConfig: any;

  protected blocksConfig = environment.item.details.blocksConfig;
  protected typesConfig = environment.item.details.typesConfig;

  ngOnInit(): void {
    this.targetConfig = this.typesConfig[this.item.firstMetadataValue('dc.type.maintype')];
  }
}