import { AsyncPipe, LowerCasePipe, NgClass, NgForOf, NgIf, NgTemplateOutlet } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import {
  AffiliationData,
  PublicationAffiliationDataService
} from '../../core/data/publication-affiliation-data.service';
import { SearchConfigurationService } from '../../core/shared/search/search-configuration.service';
import { SearchService } from '../../core/shared/search/search.service';

@Component({
  selector: 'ds-browse-by-affiliation',
  templateUrl: 'browse-by-affiliation.component.html',
  styleUrls: ['browse-by-affiliation.component.scss'],
  standalone: true,
  imports: [
    TranslateModule,
    NgIf,
    AsyncPipe,
    NgTemplateOutlet,
    NgForOf,
    NgClass,
    LowerCasePipe,
    RouterLink
  ]
})
/**
 * Component for browsing on affiliations
 */
export class BrowseByAffiliationComponent implements OnInit {

  protected affiliations$: Observable<AffiliationData[]>;
  private collapsedAffiliation: Set<string> = new Set<string>();
  protected searchPath: String;

  constructor(
    protected publicationAffiliationDataService: PublicationAffiliationDataService,
    protected searchService: SearchService,
    protected searchConfigService: SearchConfigurationService,
  ) { }

  ngOnInit() {
    this.affiliations$ = this.publicationAffiliationDataService.getAffiliation({'documentCount': true});
    this.searchPath = this.searchService.getSearchLink();
  }

  /**
   * Cleans the affiliation name by removing the acronym and leading fillers.
   * @param affiliation The affiliation object containing name and acronym.
   * @returns The cleaned name string.
   */
  cleanAffiliationName(affiliation: AffiliationData): string {
    if (!affiliation.name) {
      return '';
    }

    const acronym = affiliation.acronym;
    let cleanedName = affiliation.name;

    // 1. Check if name starts with acronym
    if (acronym && cleanedName.startsWith(acronym)) {
      // 2. Remove acronym from the beginning
      cleanedName = cleanedName.substring(acronym.length);
      //3. Remove "fillers" at the start of the remaining string.
      //   This Regex targets: ^\s*(optional spaces at start), [-\/:]+(one or more filler characters), \s*(optional spaces after fillers)
      const fillerRegex = /^\s*[-\/:]+\s*/;
      cleanedName = cleanedName.replace(fillerRegex, '');
    }
    return cleanedName.trim();
  }

  toggleAffiliation(affiliation: AffiliationData): void {
    if (this.collapsedAffiliation.has(affiliation.uuid)) {
      this.collapsedAffiliation.delete(affiliation.uuid);
    } else {
      this.collapsedAffiliation.add(affiliation.uuid);
    }
  }

  isCollapsed(affiliation: AffiliationData): boolean {
    return this.collapsedAffiliation.has(affiliation.uuid);
  }

  buildQueryParam(affiliation: AffiliationData) {
    return this.searchConfigService.selectNewAppliedFilterParams(
      "isHierarchicalOrgUnitOfPublication",
      affiliation.uuid,
      'equals'
    );
  }
}