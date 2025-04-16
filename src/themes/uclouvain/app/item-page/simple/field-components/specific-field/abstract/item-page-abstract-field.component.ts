import { NgIf } from "@angular/common";
import { Component, Input, OnInit } from "@angular/core";
import { BrowseDefinitionDataService } from "src/app/core/browse/browse-definition-data.service";
import { BrowseService } from "src/app/core/browse/browse.service";
import { LocaleService } from "src/app/core/locale/locale.service";
import { Item } from "src/app/core/shared/item.model";
import { MetadataValue } from "src/app/core/shared/metadata.models";
import { ItemPageAbstractFieldComponent as BaseComponent } from "src/app/item-page/simple/field-components/specific-field/abstract/item-page-abstract-field.component";
import { TruncatablePartComponent } from "src/app/shared/truncatable/truncatable-part/truncatable-part.component";
import { TruncatableComponent } from "src/app/shared/truncatable/truncatable.component";

/**
 * Custom component to display different abstract and their language.
 * Each abstract is 'truncatable' if is longer than 3 lines.
 *
 * @author Michaël Pourbaix (michael.pourbaix@uclouvain.be)
 */
@Component({
  selector: 'ds-item-page-abstract-custom-field',
  template: `
    <div>
      <ds-truncatable *ngIf="abstractToDisplay" [id]="getTruncateId()">
        <ds-truncatable-part [id]="getTruncateId()" [minLines]="minLines">
          <span *ngIf="abstractToDisplay.language" class="px-1 text-nowrap font-italic text-muted">
            ({{ abstractToDisplay.language }})
          </span>
          <span>{{ abstractToDisplay.value }}</span>
        </ds-truncatable-part>
      </ds-truncatable>
    </div> 
    `,
  standalone: true,
  imports: [
    TruncatableComponent,
    TruncatablePartComponent,
    NgIf,
  ]
})
export class ItemPageAbstractCustomFieldComponent extends BaseComponent implements OnInit {

  /** The item to extract the abstracts for. */
  @Input() item: Item;
  /** The minimum number of lines to display for an abstract. */
  @Input() minLines: number = 10;

  protected abstractToDisplay: MetadataValue;

  constructor(
    protected browseDefinitionDataService: BrowseDefinitionDataService,
    protected browseService: BrowseService,
    protected localeService: LocaleService,
  ) {
    super(browseDefinitionDataService, browseService)
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.abstractToDisplay = this.getBestAbstract(
      this.item.allMetadata('dc.description.abstract'),
      this.localeService.getCurrentLanguageCode()
    );
  }

  /**
   * Get the best possible abstract using the current user language.
   * @param abstracts All the abstracts from the item.
   * @param currentUserLanguage The current language selected by the user in the UI.
   * @returns The best possible match or null if there are no abstracts.
   */
  protected getBestAbstract(abstracts: MetadataValue[], currentUserLanguage: string): MetadataValue {
    // If we have only one abstract, select it.
    if (abstracts.length < 2) {
      return abstracts[0] || null;
    }
    // If we have more than one abstract, we need to find the best match using the following rules:
    //    - If there is an abstract for the selected language, use it.
    //    - If there is no abstract for the selected language, use the one in 'en'.
    //    - If there is no abstract for the selected language and none in 'en', use the first abstract.
    let matchingAbstract: MetadataValue;
    if (!(matchingAbstract = abstracts.find(mv => mv.language == currentUserLanguage))) {
      matchingAbstract = abstracts.find(mv => mv.language == 'en') || abstracts[0];
    }
    return matchingAbstract;
  }

  protected getTruncateId(): string {
    return this.item.id + '-dc.description.abstract';
  }
}