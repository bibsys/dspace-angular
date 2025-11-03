import { hasValue, isEmpty, isNotEmpty } from "src/app/shared/empty.util";
import { DefaultOneboxResultElementComponent } from "./default/default-onebox-result-element.component";

/**
 * Decorator used to customize the content of an 'dynamic-onebox' field selection option.
 * For a specific metadata field, this decorator allows to define a component that should be used to render search results.
 *
 * How to use :
 *   Add the decorator `@OneboxResultElementComponent('metadataField')`
 *   on your custom component. The component needs a 'data' parameter in its constructor method.
 *   This parameter will be injected using 'data' key and will contain useful information on the search result.
 *
 * Example:
 * ```
 *   @OneboxResultElementComponent('dc.contributor.author')
 *   @Component({...})
 *   export class MyCustomComponent {
 *      data: any = null;
 *      constructor(@Inject('data') inputData: any) {
 *        this.data = inputData;
 *      }
 *   }
 * ```
 */

const map = new Map();

/**
 * Decorator to list a component as usable to render the search results of all provided fields.
 *
 * @param metadataFields The metadata fields for which the component can be used.
 */
export function OneboxResultElementComponent(metadataFields: string[]) {
  if (isEmpty(metadataFields)) return;
  return function decorator(component: any) {
    metadataFields.forEach(metadataField => {
      const normalizedField = metadataField.toLowerCase();
      if (hasValue(normalizedField) && !map.has(normalizedField)) {
        map.set(normalizedField, component);
      }
    })
  }
}

/**
 * Get a specific component to render for a given metadata field.
 * If no component are found for the given metadata field, return the default component (created by DSpace).
 *  
 * @param metadataField The metadata field to get a component for.
 * @returns The component that corresponds to the given metadata field or the default component if not found.
 */
export function getOneboxResultElementComponent(metadataField: string) {
  const normalizedField = (isNotEmpty(metadataField)) ? metadataField.toLowerCase() : null;
  return (hasValue(normalizedField) && map.has(normalizedField))
    ? map.get(normalizedField)
    : DefaultOneboxResultElementComponent; 
}
