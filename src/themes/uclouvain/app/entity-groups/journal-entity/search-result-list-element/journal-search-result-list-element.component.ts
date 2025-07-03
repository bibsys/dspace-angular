import { NgClass, NgIf } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { RouterLink } from "@angular/router";
import { NgbTooltipModule } from "@ng-bootstrap/ng-bootstrap";
import { TranslateModule } from "@ngx-translate/core";
import { Context } from "src/app/core/shared/context.model";
import { ViewMode } from "src/app/core/shared/view-mode.model";
import { ThemedBadgesComponent } from "src/app/shared/object-collection/shared/badges/themed-badges.component";
import { listableObjectComponent } from "src/app/shared/object-collection/shared/listable-object/listable-object.decorator";
import { ItemSearchResultListElementComponent } from "src/app/shared/object-list/search-result-list-element/item-search-result/item-types/item/item-search-result-list-element.component";
import { JournalPeerReviewedComponent } from "../specific-fields/journal-peer-reviewed.component";
import { ItemIdentifierDisplayComponent } from "../../../shared/item-idenitfier-display/item-identifier-display.component";
import { JournalCeasedStatusBadge } from "../specific-fields/journal-ceased-status-badge.component";

/**
 * Search result element to display for 'Journal' items.
 * It displays all the informations about the journal: Title, publisher, identifiers, status and peer-reviewed state.
 * This component needs to be rendered for Journals in workspace state and in the global search (see decorator below).
 * 
 * @author Michaël Pourbaix <michael.pourbaix@uclouvain.be>
 */
@listableObjectComponent('JournalSearchResult', ViewMode.ListElement, Context.Search, 'uclouvain')
@listableObjectComponent('JournalSearchResult', ViewMode.ListElement, Context.MyDSpaceWorkspace, 'uclouvain')
@Component({
  selector: 'ds-journal-search-result-list-element',
  templateUrl: './journal-search-result-list-element.component.html',
  standalone: true,
  imports: [
    RouterLink,
    NgIf,
    NgClass,
    NgbTooltipModule,
    ThemedBadgesComponent,
    TranslateModule,
    JournalPeerReviewedComponent,
    ItemIdentifierDisplayComponent,
    JournalCeasedStatusBadge,
  ],
})
export class UCLouvainJournalSearchResultListElementComponent extends ItemSearchResultListElementComponent implements OnInit {

  // Metadata to display
  protected publisher: string;
  protected publisherLocation: string;
  protected issn: string;
  protected eissn: string;
  protected status: string;
  protected peerReviewed: boolean;

  ngOnInit(): void {
    super.ngOnInit();
    this.publisher = this.dso.firstMetadataValue('dc.publisher');
    this.publisherLocation = this.dso.firstMetadataValue('dc.publisher.location');
    this.issn = this.dso.firstMetadataValue('dc.identifier.issn');
    this.eissn = this.dso.firstMetadataValue('dc.identifier.eissn');
    this.status = this.dso.firstMetadataValue('journal.statusCode');
    this.peerReviewed = this.dso.firstMetadataValue('journal.peerReviewed') === 'true';
  }
}