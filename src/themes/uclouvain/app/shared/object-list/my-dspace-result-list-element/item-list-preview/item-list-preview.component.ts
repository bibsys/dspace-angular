
import { Component } from "@angular/core";
import { ItemListPreviewComponent as BaseComponent } from "src/app/shared/object-list/my-dspace-result-list-element/item-list-preview/item-list-preview.component";
import { PublicationSearchResultListElementComponent } from "src/themes/uclouvain/app/entity-groups/publication-entity/search-result-list-elements/publication-search-result/publication-search-result-list-element.component";

@Component({
    selector: 'ds-themed-item-list-preview',
    template: `
        <ds-publication-search-result-list-element 
            [item]="item"
            [context]="badgeContext"
        />
    `,
    standalone: true,
    imports: [PublicationSearchResultListElementComponent],
})
export class ItemListPreviewComponent extends BaseComponent {}