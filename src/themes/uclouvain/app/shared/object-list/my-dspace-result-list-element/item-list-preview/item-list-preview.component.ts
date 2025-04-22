
import { Component } from "@angular/core";
import { ItemListPreviewComponent as BaseComponent } from "src/app/shared/object-list/my-dspace-result-list-element/item-list-preview/item-list-preview.component";

@Component({
    selector: 'ds-item-list-preview',
    template: `
        <ds-publication-search-result-list-element 
            [item]="item"
            [context]="badgeContext"
        />
    `,
})
export class ItemListPreviewComponent extends BaseComponent {}