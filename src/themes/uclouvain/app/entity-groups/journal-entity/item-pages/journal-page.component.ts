import { AsyncPipe, NgIf } from "@angular/common";
import { Component, Input } from "@angular/core";
import { TranslateModule } from "@ngx-translate/core";
import { Context } from "src/app/core/shared/context.model";
import { DSpaceObjectType } from "src/app/core/shared/dspace-object-type.model";
import { ViewMode } from "src/app/core/shared/view-mode.model";
import { GenericItemPageFieldComponent } from "src/app/item-page/simple/field-components/specific-field/generic/generic-item-page-field.component";
import { ThemedItemPageTitleFieldComponent } from "src/app/item-page/simple/field-components/specific-field/title/themed-item-page-field.component";
import { ItemComponent } from "src/app/item-page/simple/item-types/shared/item.component";
import { ContextMenuComponent } from "src/app/shared/context-menu/context-menu.component";
import { listableObjectComponent } from "src/app/shared/object-collection/shared/listable-object/listable-object.decorator";
import { ThemedResultsBackButtonComponent } from "src/app/shared/results-back-button/themed-results-back-button.component";
import { JournalPeerReviewedComponent } from "../specific-fields/journal-peer-reviewed.component";
import { PageDetailSectionComponent } from "../../../shared/page-detail-section.component";

/**
 * Item page rendered for the 'Journal' item type.
 * It displays basic information such as title, publisher, identifiers, status and peer-reviewed state.
 * 
 * @author Michaël Pourbaix <michael.pourbaix@uclouvain.be>
 */
@listableObjectComponent('Journal', ViewMode.StandalonePage, Context.Any, 'uclouvain')
@Component({
  selector: 'ds-journal-page',
  templateUrl: './journal-page.component.html',
  styleUrl: './journal-page.component.scss',
  standalone: true,
  imports: [
    ThemedResultsBackButtonComponent,
    ContextMenuComponent,
    ThemedItemPageTitleFieldComponent,
    TranslateModule,
    AsyncPipe,
    NgIf,
    GenericItemPageFieldComponent,
    JournalPeerReviewedComponent,
    PageDetailSectionComponent,
  ],
})
export class JournalPageComponent extends ItemComponent {
  @Input() showLabel: boolean;
  @Input() showMetrics: boolean;
  @Input() viewMode: ViewMode;
  @Input() showCorrection: boolean;
  @Input() showThumbnails: boolean;

  protected readonly DspaceObjectType = DSpaceObjectType;
}