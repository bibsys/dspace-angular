import {
  listableObjectComponent
} from '../../../../../../app/shared/object-collection/shared/listable-object/listable-object.decorator';
import { ViewMode } from '../../../../../../app/core/shared/view-mode.model';
import { Context } from '../../../../../../app/core/shared/context.model';
import { Component } from '@angular/core';
import {
  AbstractListableElementComponent
} from '../../../../../../app/shared/object-collection/shared/object-collection-element/abstract-listable-element.component';
import { Item } from '../../../../../../app/core/shared/item.model';


@listableObjectComponent('MasterThesis', ViewMode.ListElement, Context.Any, 'uclouvain')
@Component({
  selector: 'ds-master-thesis-list-element',
  template: `<ds-master-thesis-search-result-list-element 
          [showLabel]="showLabel"
          [showThumbnails]="showThumbnails"
          [object]="{ indexableObject: object, hitHighlights: {} }" 
          [linkType]="linkType">
  </ds-master-thesis-search-result-list-element>
  `
})
/**
 * The component for displaying a list element for an item of the type MasterThesis
 */
export class MasterThesisListElementComponent extends AbstractListableElementComponent<Item> {
}