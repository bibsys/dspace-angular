import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { ObjectListComponent as BaseComponent} from '../../../../../app/shared/object-list/object-list.component';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { distinctUntilChanged, map, switchMap } from 'rxjs/operators';
import { SortDirection, SortOptions } from '../../../../../app/core/cache/models/sort-options.model';
import { SearchConfig } from '../../../../../app/core/shared/search/search-filters/search-config.model';
import { SEARCH_CONFIG_SERVICE } from '../../../../../app/my-dspace-page/my-dspace-page.component';
import { SearchConfigurationService } from '../../../../../app/core/shared/search/search-configuration.service';
import { SelectableListService } from '../../../../../app/shared/object-list/selectable-list/selectable-list.service';
import { PaginationService } from '../../../../../app/core/pagination/pagination.service';

/** A component to display a list of objects and widget to navigate through them
 *    For UCLouvain theme, we should display the "sort by" widget at top the result list instead into the sidebar.
 */
@Component({
  selector: 'ds-object-list',
  styleUrls: ['../../../../../app/shared/object-list/object-list.component.scss', './object-list.component.scss'],
  templateUrl: './object-list.component.html',
  providers: [
    {
      provide: SEARCH_CONFIG_SERVICE,
      useClass: SearchConfigurationService
    }
  ]
})
export class ObjectListComponent extends BaseComponent implements OnInit, OnDestroy {

  // COMPONENT ATTRIBUTES =====================================================
  sortOptionsList$: BehaviorSubject<SortOptions[]> = new BehaviorSubject<SortOptions[]>([]);

  protected readonly SortDirection = SortDirection;
  private subs: Subscription[] = [];

  // CONSTRUCTOR & HOOKS ======================================================
  constructor(
    protected paginationService: PaginationService,
    protected selectionService: SelectableListService,
    @Inject(SEARCH_CONFIG_SERVICE) public searchConfigService: SearchConfigurationService,
  ){
    super(selectionService);
  }

  /** OnInit hook */
  ngOnInit() {
    this.hasBorder = true;  // force border-bottom
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
