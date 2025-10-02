import { AsyncPipe, NgIf, NgTemplateOutlet } from "@angular/common";
import { Component, Input } from "@angular/core";
import { TranslateModule } from "@ngx-translate/core";
import { Context } from "src/app/core/shared/context.model";
import { DSpaceObjectType } from "src/app/core/shared/dspace-object-type.model";
import { ViewMode } from "src/app/core/shared/view-mode.model";
import { GenericItemPageFieldComponent } from "src/app/item-page/simple/field-components/specific-field/generic/generic-item-page-field.component";
import { ThemedItemPageTitleFieldComponent } from "src/app/item-page/simple/field-components/specific-field/title/themed-item-page-field.component";
import { ItemComponent } from "src/app/item-page/simple/item-types/shared/item.component";
import { ContextMenuComponent } from "src/app/shared/context-menu/context-menu.component";
import { MetadataFieldWrapperComponent } from "src/app/shared/metadata-field-wrapper/metadata-field-wrapper.component";
import { listableObjectComponent } from "src/app/shared/object-collection/shared/listable-object/listable-object.decorator";
import { ThemedResultsBackButtonComponent } from "src/app/shared/results-back-button/themed-results-back-button.component";
import { ThemedThumbnailComponent } from "src/app/thumbnail/themed-thumbnail.component";
import { TabbedRelatedEntitiesSearchComponent } from "src/app/item-page/simple/related-entities/tabbed-related-entities-search/tabbed-related-entities-search.component";
import { ItemPageHeadingComponent } from "../../../shared/item-page/item-page-heading.component";
import { ItemPageAffiliationFieldComponent } from "../../../item-page/simple/field-components/specific-field/affiliation/item-page-affiliation-field.component";
import { OrcidShortFormatComponent } from "../../../item-page/simple/field-components/specific-field/orcid/orcid-short-format.component";

/**
 * Component to display information about a person in this case an author.
 * 
 * @author Michaël Pourbaix <michael.pourbaix@uclouvain.be>
 */
@listableObjectComponent('Person', ViewMode.StandalonePage, Context.Any, 'uclouvain')
@Component({
  selector: 'ds-person-page',
  templateUrl: './person-page.component.html',
  standalone: true,
  imports: [
    NgIf,
    AsyncPipe,
    TranslateModule,
    ContextMenuComponent,
    ThemedResultsBackButtonComponent,
    GenericItemPageFieldComponent,
    ThemedItemPageTitleFieldComponent,
    NgTemplateOutlet,
    MetadataFieldWrapperComponent,
    ThemedThumbnailComponent,
    TabbedRelatedEntitiesSearchComponent,
    ItemPageHeadingComponent,
    ItemPageAffiliationFieldComponent,
    OrcidShortFormatComponent,
  ],
})
export class UCLouvainPersonPageComponent extends ItemComponent {
  @Input() showLabel: boolean;
  @Input() showMetrics: boolean;
  @Input() viewMode: ViewMode;
  @Input() showCorrection: boolean;
  @Input() showThumbnails: boolean;

  protected readonly DspaceObjectType = DSpaceObjectType;
}