
import { Component } from "@angular/core";
import { CollectionElementLinkType } from "src/app/shared/object-collection/collection-element-link.type";
import { ListableObjectComponentLoaderComponent } from "src/app/shared/object-collection/shared/listable-object/listable-object-component-loader.component";
import { ItemListPreviewComponent as BaseComponent } from "src/app/shared/object-list/my-dspace-result-list-element/item-list-preview/item-list-preview.component";

@Component({
    selector: 'ds-themed-item-list-preview',
    template: `
        <ds-listable-object-component-loader
            [viewMode]="viewMode"
            [linkType]="LinkTypes.None"
            [object]="item"
            [context]="badgeContext"
            [showMetrics]="false"
            [showThumbnails]="showThumbnails"/>
    `,
    standalone: true,
    imports: [ListableObjectComponentLoaderComponent],
})
export class ItemListPreviewComponent extends BaseComponent {
    LinkTypes = CollectionElementLinkType;
}