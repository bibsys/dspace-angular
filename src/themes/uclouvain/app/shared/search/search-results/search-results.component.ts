import { SearchResultsComponent as BaseComponent } from '../../../../../../app/shared/search/search-results/search-results.component';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { fadeIn, fadeInOut } from '../../../../../../app/shared/animations/fade';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { distinctUntilChanged, map, switchMap } from 'rxjs/operators';
import { SortDirection, SortOptions } from '../../../../../../app/core/cache/models/sort-options.model';
import { SEARCH_CONFIG_SERVICE } from '../../../../../../app/my-dspace-page/my-dspace-page.component';
import { SearchConfigurationService } from '../../../../../../app/core/shared/search/search-configuration.service';
import { SearchConfig } from '../../../../../../app/core/shared/search/search-filters/search-config.model';
import { PaginationService } from '../../../../../../app/core/pagination/pagination.service';

@Component({
  selector: 'ds-search-results',
  templateUrl: './search-results.component.html',
  animations: [fadeIn, fadeInOut],
  providers: [
    {
      provide: SEARCH_CONFIG_SERVICE,
      useClass: SearchConfigurationService
    }
  ]
})
export class SearchResultsComponent extends BaseComponent implements OnInit, OnDestroy {

  // COMPONENT ATTRIBUTES =====================================================
  sortOptionsList$: BehaviorSubject<SortOptions[]> = new BehaviorSubject<SortOptions[]>([]);
  private subs: Subscription[] = [];
  protected readonly SortDirection = SortDirection;

  // CONSTRUCTOR & HOOKS ======================================================
  constructor(
    protected paginationService: PaginationService,
    @Inject(SEARCH_CONFIG_SERVICE) public searchConfigService: SearchConfigurationService,
  ){ super(); }

  /** OnInit hook */
  ngOnInit() {
    const configuration$: Observable<string> = this.searchConfigService
      .getCurrentConfiguration('')
      .pipe(distinctUntilChanged());
    const searchSortOptions$: Observable<SortOptions[]> = configuration$
      .pipe(
        switchMap((configuration: string) => this.searchConfigService.getConfigurationSearchConfig(configuration)),
        map((searchConfig: SearchConfig) => this.searchConfigService.getConfigurationSortOptions(searchConfig)),
        distinctUntilChanged()
      );
    this.subs.push(
      searchSortOptions$.subscribe((options: SortOptions[]) => this.sortOptionsList$.next(options))
    );
  }

  /** OnDestroy hook */
  ngOnDestroy() {
    this.subs.forEach(s => s.unsubscribe());
  }

  // COMPONENT FUNCTIONS ======================================================
  /**
   * Handler to manage sort result changes.
   * @param event The triggered event.
   */
  reloadOrder(event: Event): void {
    const values = (event.target as HTMLInputElement).value.split(',');
    this.paginationService.updateRoute(this.searchConfigService.paginationID, {
      sortField: values[0],
      sortDirection: values[1] as SortDirection,
      page: 1
    });
  }

}
