import { Component } from "@angular/core";
import { Context } from "src/app/core/shared/context.model";
import { Item } from "src/app/core/shared/item.model";
import { ViewMode } from "src/app/core/shared/view-mode.model";
import { listableObjectComponent } from "src/app/shared/object-collection/shared/listable-object/listable-object.decorator";
import { AbstractListableElementComponent } from "src/app/shared/object-collection/shared/object-collection-element/abstract-listable-element.component";
import { PublicationSearchResultWrapperComponent } from "../search-result-list-elements/publication-search-result/publicaton-search-result-wrapper.component.html/publication-search-result-wrapper.component";


@listableObjectComponent('Publication', ViewMode.ListElement, Context.Search, 'uclouvain')
@Component({
  selector: 'ds-publication-list-element',
  template: `<ds-publication-search-result-list-element-wrapper
              [showLabel]="showLabel"
              [showThumbnails]="showThumbnails"
              [object]="{ indexableObject: object, hitHighlights: {} }" 
              [linkType]="linkType">
            </ds-publication-search-result-list-element-wrapper>`,
  standalone: true,
  imports: [PublicationSearchResultWrapperComponent]
})
/**
 * Component for displaying a list element for an item of type 'Publication'.
 */
export class PublicationListElementComponent extends AbstractListableElementComponent<Item> {
}