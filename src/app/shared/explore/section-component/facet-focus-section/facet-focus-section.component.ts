import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject } from "rxjs";
import { FacetFocusSection } from "src/app/core/layout/models/section.model";
import { getFirstSucceededRemoteDataPayload } from "src/app/core/shared/operators";
import { SearchConfigurationService } from "src/app/core/shared/search/search-configuration.service";
import { SearchService } from "src/app/core/shared/search/search.service";
import { FacetValue } from "src/app/shared/search/models/facet-value.model";
import { FilterType } from "src/app/shared/search/models/filter-type.model";
import { SearchFilterConfig } from "src/app/shared/search/models/search-filter-config.model";
import { getFacetValueForTypeAndLabel } from "src/app/shared/search/search.utils";

@Component({
    selector: 'ds-facet-focus-section',
    templateUrl: './facet-focus-section.component.html',
    styles: [".facet-value {cursor: pointer; transition: 0.5s ease}.facet-value:hover {background: var(--bs-gray-200);}"],
})
export class FacetFocusSectionComponent implements OnInit {
    @Input()
    sectionId: string;

    @Input()
    facetFocusSection: FacetFocusSection;

    discoveryConfiguration: string;

    targetFacet: SearchFilterConfig = null;
    targetFacet$ = new BehaviorSubject(this.targetFacet);

    constructor(private searchConfigService: SearchConfigurationService, private searchService: SearchService, private router: Router) {}

    ngOnInit() {
        this.discoveryConfiguration = this.facetFocusSection.discoveryConfigurationName;
        this.searchConfigService.searchFacets(null, this.discoveryConfiguration)
        .pipe(getFirstSucceededRemoteDataPayload())
        .subscribe((facetConfigs) => {
            for (const config of facetConfigs) {
                if (config._embedded.values.length > 0 && config.name == this.facetFocusSection.targetFacet) {
                    this.targetFacet = config;
                    this.targetFacet$.next(this.targetFacet);
                }
            }
        });
    }

    /**
     * When the user clicks on a facet entry, navigate to the search page with the facet value applied. 
     */
    navigateToFacetView(facet: SearchFilterConfig, value: FacetValue) {
        this.router.navigate([this.searchService.getSearchLink()], { queryParams: this.getSearchQueryParams(facet, value) });
    }

    /**
    * Returns the queryParams for the search related to the given facet.
    *
    * @param facet the facet
    * @param facetValue the FacetValue
    */
    getSearchQueryParams(facet: SearchFilterConfig, facetValue: FacetValue) {
        const queryParams = {
            configuration: this.facetFocusSection.discoveryConfigurationName,
            page: 1
        };
        this.addFacetValuesToQueryParams(facet, facetValue, queryParams);
        return queryParams;
    }

    private addFacetValuesToQueryParams(facet: SearchFilterConfig, facetValue: FacetValue, queryParams) {
        if (this.isRangeFacet(facet.filterType, facetValue.label)) {
            const dates = facetValue.label.split('-');
            queryParams[facet.paramName + '.min'] = dates[0].trim();
            queryParams[facet.paramName + '.max'] = dates[1].trim();
            return;
        }
        queryParams[facet.paramName] = getFacetValueForTypeAndLabel(facetValue, facet);
    }

    private isRangeFacet(filterType: FilterType, value: string) {
        return filterType === FilterType.range && value.split('-').length === 2;
    }
}