import { Context } from '../../../../../../app/core/shared/context.model';
import { ViewMode } from '../../../../../../app/core/shared/view-mode.model';

export const DEFAULT_VIEW_MODE = ViewMode.StandalonePage;
export const DEFAULT_CONTEXT = Context.Any;
export const DEFAULT_THEME = '*';
export const DEFAULT_WEIGHT = 50;


class MetadataBlockComponentConfig {
  documentType: string;
  viewMode: ViewMode;
  context: Context;
  theme: string;
  weight?: number;

  matchs(documentType: String, viewMode: ViewMode, context: Context, theme: string): boolean {
    return (this.documentType === '*' || this.documentType === documentType) &&
           this.viewMode === viewMode &&
           (this.context === Context.Any || this.context === context) &&
           (this.theme === DEFAULT_THEME || this.theme === theme);
  }
}

/**
 * Metadata block decorator
 *
 *    Used to display specific block of metadata depending on item to display.
 *    Using the decorator, on a component, we can specify if the component should be displayed depending on:
 *      - item documentType (we can use '*' wildcard to match all document type)
 *      - specific view mode (Standalone, grid, list, ...). the default value is `StandalonePage`
 *      - specific context
 *      - for a specific theme (we can use '*' wildcard to match any themes)
 *
 *    If the component must be displayed for multiple documentType, you can repeat the decorator notation any times it's
 *    necessary to match desired document types.
 *
 *    Usage:
 *    @listableMetadataBlockComponent('text::thesis', ViewMode.StandalonePage, Context.Any, '*', 50)
 *    @listableMetadataBlockComponent('*, ViewMode.StandalonePage, Context.Any, 'uclouvain', 12)
 *    @listableMetadataBlockComponent('text::journal-article', ViewMode.Grid, Context.ItemPage, '*', Number.MAX_SAFE_VALUE)
 */


const componentList: {config: MetadataBlockComponentConfig, component: any}[] = [];

/**
 * Decorator used for rendering specific block of metadata about a publication item
 * @param documentType The document type applicable by this component. We can use the '*' wildcard if the component must match all document types.
 * @param viewMode The view mode the component represents
 * @param context The optional context the component represents
 * @param theme The optional theme for the component (use '*' wildcard for any theme)
 * @param weight The sorting weight to apply on the component. Less weight = more priority (and display first).
 */
export function listableMetadataBlockComponent(documentType: string, viewMode: ViewMode = DEFAULT_VIEW_MODE, context: Context = DEFAULT_CONTEXT, theme: string = DEFAULT_THEME, weight: number = DEFAULT_WEIGHT) {
  return function decorator(component: any) {
    const config: MetadataBlockComponentConfig = Object.assign(new MetadataBlockComponentConfig(), {documentType, viewMode, context, theme, weight});
    componentList.push({config, component});
  }
}

/**
 * Getter to retrieve the matching listable metadata block components
 *
 * @param documentType The document type to check
 * @param viewMode The view mode that should match the components
 * @param context The context that should match the components
 * @param theme The theme that should match the components
 * @returns All components matching criteria sorting by weight.
 */
export function getListableMetadataBlockComponent(documentType: string, viewMode: ViewMode = DEFAULT_VIEW_MODE, context: Context = DEFAULT_CONTEXT, theme: string = DEFAULT_THEME) {
  const matchingComponents: {weight: number, component: any}[] = [];
  for (const component of componentList) {
    if (component.config.matchs(documentType, viewMode, context, theme)) {
      matchingComponents.push({weight: component.config.weight, component: component.component});
    }
  }
  return matchingComponents
    .sort((a, b) => a.weight - b.weight)
    .map(item => item.component);
}