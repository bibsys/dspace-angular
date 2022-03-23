import { Injectable } from '@angular/core';
import { CrisLayoutTab } from './models/tab.model';
import { DataService } from '../data/data.service';
import { RequestService } from '../data/request.service';
import { RemoteDataBuildService } from '../cache/builders/remote-data-build.service';
import { CoreState } from '../core.reducers';
import { Store } from '@ngrx/store';
import { ObjectCacheService } from '../cache/object-cache.service';
import { HALEndpointService } from '../shared/hal-endpoint.service';
import { NotificationsService } from '../../shared/notifications/notifications.service';
import { HttpClient } from '@angular/common/http';
import { ChangeAnalyzer } from '../data/change-analyzer';
import { TAB } from './models/tab.resource-type';
import { dataService } from '../cache/builders/build-decorators';
import { Observable } from 'rxjs';
import { RemoteData } from '../data/remote-data';
import { DefaultChangeAnalyzer } from '../data/default-change-analyzer.service';
import { PaginatedList } from '../data/paginated-list.model';
import { FollowLinkConfig } from '../../shared/utils/follow-link-config.model';
import { FindListOptions } from '../data/request.models';
import { RequestParam } from '../cache/models/request-param.model';
import { map } from 'rxjs/operators';

/* tslint:disable:max-classes-per-file */

class DataServiceImpl extends DataService<CrisLayoutTab> {
  protected linkPath = 'tabs';

  constructor(
    protected requestService: RequestService,
    protected rdbService: RemoteDataBuildService,
    protected store: Store<CoreState>,
    protected objectCache: ObjectCacheService,
    protected halService: HALEndpointService,
    protected notificationsService: NotificationsService,
    protected http: HttpClient,
    protected comparator: ChangeAnalyzer<CrisLayoutTab>) {
    super();
  }
}

/**
 * A service responsible for fetching data from the REST API on the tabs endpoint
 */
@Injectable()
@dataService(TAB)
export class TabDataService {
  protected searchFindByItem = 'findByItem';
  protected searchFindByEntityType = 'findByEntityType';
  private dataService: DataServiceImpl;

  constructor(
    protected requestService: RequestService,
    protected rdbService: RemoteDataBuildService,
    protected objectCache: ObjectCacheService,
    protected halService: HALEndpointService,
    protected notificationsService: NotificationsService,
    protected http: HttpClient,
    protected comparator: DefaultChangeAnalyzer<CrisLayoutTab>) {
    this.dataService = new DataServiceImpl(requestService, rdbService, null, objectCache, halService, notificationsService, http, comparator);
  }

  /**
   * Provide detailed information about a specific tab.
   * @param id id of tab
   */
  findById(id: string): Observable<RemoteData<CrisLayoutTab>> {
    return this.dataService.findById(id);
  }

  /**
   * It returns the tabs that are available for the specified item. The tabs are sorted by
   * priority ascending. This are filtered based on the permission of the current user and
   * available data. Empty tabs are filter out.
   * @param itemUuid UUID of the Item
   * @param useCachedVersionIfAvailable
   * @param linkToFollow
   */
  findByItem(itemUuid: string, useCachedVersionIfAvailable, excludeMinors?: boolean ,linkToFollow?: FollowLinkConfig<CrisLayoutTab>): Observable<RemoteData<PaginatedList<CrisLayoutTab>>> {
    const options = new FindListOptions();
    options.searchParams = [new RequestParam('uuid', itemUuid)];

    return this.dataService.searchBy(this.searchFindByItem, options, useCachedVersionIfAvailable).pipe(map((data) => {
        if (!!data.payload && !!data.payload.page && excludeMinors) {
          data.payload.page = this.filterTab(data.payload.page);
        }
        return data;
      }));
  }

  /**
   * @param tabs
   * @returns Tabs which contains non minor element
   */
  filterTab(tabs: CrisLayoutTab[]): CrisLayoutTab[] {
   return tabs.filter(tab => this.checkForMinor(tab));
  }

  /**
   * @param tab  Contains a tab data which has rows, cells and boxes
   * @returns Boolean based on cells has minor or not
   */
  checkForMinor(tab: CrisLayoutTab): boolean {
    for (const row of tab.rows) {
        for (const cell of row.cells) {
            for (const box of cell.boxes) {
                if (box.minor) {
                  return false;
                }
            }
        }
    }
    return true;
  }

  /**
   * It returns the tabs that are available for the items of the specified type.
   * This endpoint is reserved to system administrators
   * @param entityType label of the entity type
   */
  findByEntityType(entityType: string): Observable<RemoteData<PaginatedList<CrisLayoutTab>>> {
    const options = new FindListOptions();
    options.searchParams = [new RequestParam('type', entityType)];
    return this.dataService.searchBy(this.searchFindByEntityType, options);
  }
}
