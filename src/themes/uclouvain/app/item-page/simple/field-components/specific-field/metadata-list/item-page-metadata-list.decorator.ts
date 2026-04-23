import { Component } from "@angular/core";
import { hasValue } from "src/app/shared/empty.util";

/**
 * Decorator to mark a component has a list element that can be used by the {@link ItemPageMetadataListComponent} component.
 * Each component must give a proper metadata field which it will handle.
 * 
 * for example, you could define a new component like this:
 * ```js
 * @itemPageMetadataListElementComponent('dc.title')
 * @Component({})
 * export class ItemPageTitleListElementComponent {}
 * 
 * ```
 */

const map = new Map();

export function itemPageMetadataListElementComponent(metadata: string) {
  return function decorator(component: any) {
    if (hasValue(metadata) && !map.has(metadata)) {
      map.set(metadata, component);
    }
  }
}

export function getItemPageMetadataListElementComponent(metadata: string) {
  return map.get(metadata);
}