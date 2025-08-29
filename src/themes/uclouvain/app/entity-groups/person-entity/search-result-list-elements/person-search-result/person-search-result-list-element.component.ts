import { NgIf } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { RouterLink } from "@angular/router";
import { Context } from "src/app/core/shared/context.model";
import { ViewMode } from "src/app/core/shared/view-mode.model";
import { ThemedBadgesComponent } from "src/app/shared/object-collection/shared/badges/themed-badges.component";
import { listableObjectComponent } from "src/app/shared/object-collection/shared/listable-object/listable-object.decorator";
import { ItemSearchResultListElementComponent } from "src/app/shared/object-list/search-result-list-element/item-search-result/item-types/item/item-search-result-list-element.component";
import { OrcidShortFormatComponent } from "src/themes/uclouvain/app/item-page/simple/field-components/specific-field/orcid/orcid-short-format.component";
import { affiliationIcons } from "src/themes/uclouvain/app/shared/affiliations/affiliations-icons-mapping";

@listableObjectComponent('PersonSearchResult', ViewMode.ListElement, Context.Search, 'uclouvain')
@listableObjectComponent('PersonSearchResult', ViewMode.ListElement, Context.MyDSpaceWorkspace, 'uclouvain')
@listableObjectComponent('PersonSearchResult', ViewMode.ListElement, Context.MyDSpaceArchived, 'uclouvain')
@Component({
  selector: 'ds-person-search-result-list-element',
  templateUrl: './person-search-result-list-element.component.html',
  styles: ['.orcid-logo { max-height: 1.2rem; }'],
  standalone: true,
  imports: [
    ThemedBadgesComponent,
    RouterLink,
    NgIf,
    OrcidShortFormatComponent,
  ],
})
export class UCLouvainPersonSearchResultListElementComponent extends ItemSearchResultListElementComponent implements OnInit {
  protected name: string;
  protected institution: string;
  protected institutionIcon: string;
  protected orcid: string;

  ngOnInit(): void {
    super.ngOnInit();
    this.name = this.dso.name;
    this.institution = this.dso.firstMetadataValue('person.affiliation.institution');
    if (this.institution) {
      this.institutionIcon = affiliationIcons.get(this.institution.toLowerCase());
    }
    this.orcid = this.dso.firstMetadataValue('person.identifier.orcid');
  }
}