import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Context } from '../../../../../../../app/core/shared/context.model';
import { ViewMode } from '../../../../../../../app/core/shared/view-mode.model';
import { isNotEmpty } from '../../../../../../../app/shared/empty.util';
import { listableMetadataBlockComponent } from '../listable-metadata-block.decorator';
import { AbstractMetadataBlockComponent } from './abstract-metadata-block.component';

@listableMetadataBlockComponent('*', ViewMode.StandalonePage, Context.Any, '*', 10)
@Component({
  template: `
      <ng-container *ngIf="translatedDocumentType">
          <dt>{{ 'item.page.details.label.document-type' | translate }}</dt>
          <dd>
              <span class="main-type">{{ translatedDocumentType }}</span>
              <span class="subtype d-block text-secondary" *ngIf="translatedDocumentSubtype">
                  <i class="fas fa-arrow-turn-up fa-rotate-90 mx-2"></i>
                  <span class="font-italic">{{ translatedDocumentSubtype }}</span>
              </span>
              <span class="subtype d-block text-secondary" *ngIf="item.firstMetadataValue('publication.isAbstract') === 'true'">
                  <i class="fas fa-arrow-turn-up fa-rotate-90 mx-2"></i>
                  <span class="font-italic">{{ 'item.page.details.label.isAbstract' | translate }}</span>
              </span>
          </dd>
      </ng-container>
  `,
  standalone: true,
  imports: [NgIf, TranslateModule]
})
export class DocumentTypeMetadataBlockComponent extends AbstractMetadataBlockComponent implements OnInit {

  private static TRANSLATION_PREFIX = "item.page.details.values.";
  protected translatedDocumentType: String;
  protected translatedDocumentSubtype: String;

  constructor(
    private translateService: TranslateService
  ) {
    super();
  }

  ngOnInit() {
    this.translatedDocumentType = this.translateOrDefault(this.item.firstMetadataValue("dc.type.maintype"), "type");
    this.translatedDocumentSubtype = this.translateOrDefault(this.item.firstMetadataValue("dc.type.subtype"), "subtype");
  }

  private translateOrDefault(key: string, category: string): string {
    if (isNotEmpty(key)) {
      const prefixedKey = DocumentTypeMetadataBlockComponent.TRANSLATION_PREFIX + category + "." + key;
      const translated = this.translateService.instant(prefixedKey);
      return (translated !== prefixedKey) ? translated : key;
    }
  }
}