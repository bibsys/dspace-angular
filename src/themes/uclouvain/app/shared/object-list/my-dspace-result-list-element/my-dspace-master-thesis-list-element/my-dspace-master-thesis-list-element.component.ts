import { Component } from "@angular/core";
import { Context } from "src/app/core/shared/context.model";
import { Item } from "src/app/core/shared/item.model";
import { ViewMode } from "src/app/core/shared/view-mode.model";
import { ItemSearchResult } from "src/app/shared/object-collection/shared/item-search-result.model";
import { listableObjectComponent } from "src/app/shared/object-collection/shared/listable-object/listable-object.decorator";
import { ThemedItemListPreviewComponent } from "src/app/shared/object-list/my-dspace-result-list-element/item-list-preview/themed-item-list-preview.component";
import { SearchResultListElementComponent } from "src/app/shared/object-list/search-result-list-element/search-result-list-element.component";

@listableObjectComponent(ItemSearchResult, ViewMode.ListElement, Context.MyDSpaceWorkspace, 'uclouvain')
@listableObjectComponent(ItemSearchResult, ViewMode.ListElement, Context.MyDSpaceWorkflow, 'uclouvain')
@Component({
    selector: 'ds-my-dspace-master-thesis',
    template: "<ds-item-list-preview [item]='dso' [object]='object' [badgeContext]='context' [showThumbnails]='showThumbnails'></ds-item-list-preview>",
    imports: [
        ThemedItemListPreviewComponent,
    ],
    standalone: true,
})
export class MyDSpaceMasterThesisListElementComponent extends SearchResultListElementComponent<ItemSearchResult, Item>{}