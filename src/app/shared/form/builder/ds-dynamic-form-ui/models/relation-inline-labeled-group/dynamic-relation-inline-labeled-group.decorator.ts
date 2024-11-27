import { hasValue, isNotEmpty } from '../../../../../empty.util';

/**
 * Decorator use to customize the content of an 'inline-labeled-group' field.
 * Each entry (aka chip) to display define a 'objToDisplay' key. Depending on
 * this key, we can define a custom component that will handle the display of
 * this chip.
 *
 * How to use :
 *   Add the decorator `@inlineLabeledGroupContentComponent('chipTypeValue')`
 *   on your custom component. The component needs an 'chip' parameter in its constructor method.
 *   This parameter will be injected using 'chip' key.
 *
 * Example:
 * ```
 *   @inlineLabeledGroupContentComponent('dc.contributor.author')
 *   @Component({...})
 *   export class MyCustomComponent {
 *      entry: ChipsItem = null;
 *      constructor(@Inject('chip') inputChip: ChipsItem) {
 *        this.entry = inputChip;
 *      }
 *   }
 * ```
 */

const map = new Map();

export function inlineLabeledGroupContentComponent(type: string) {
  const normalizedType = (typeof type === 'string') ? type.toLowerCase() : type;
  return function decorator(component: any) {
    if (hasValue(normalizedType) && !map.has(normalizedType)) {
      map.set(normalizedType, component);
    }
  }
}

export function getInlineLabeledGroupContentComponent(type: string) {
    const normalizedType = (isNotEmpty(type)) ? type.toLowerCase() : null;
    return (hasValue(normalizedType) && map.has(normalizedType))
      ? map.get(normalizedType)
      : null;
}