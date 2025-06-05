import {
  AsyncPipe,
  NgClass,
  NgFor,
  NgIf,
  NgSwitch,
  NgSwitchCase,
  NgSwitchDefault,
  NgTemplateOutlet,
} from '@angular/common';
import { Component, Input, } from '@angular/core';
import { FormsModule, ReactiveFormsModule, } from '@angular/forms';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule, TranslateService, } from '@ngx-translate/core';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { DSONameService } from '../../../../core/breadcrumbs/dso-name.service';
import { CollectionDataService } from '../../../../core/data/collection-data.service';
import { AuthorizationDataService } from '../../../../core/data/feature-authorization/authorization-data.service';
import { FeatureID } from '../../../../core/data/feature-authorization/feature-id';
import { FindListOptions } from '../../../../core/data/find-list-options.model';
import { buildPaginatedList, PaginatedList, } from '../../../../core/data/paginated-list.model';
import { RemoteData } from '../../../../core/data/remote-data';
import { Collection } from '../../../../core/shared/collection.model';
import { DSpaceObject } from '../../../../core/shared/dspace-object.model';
import { getFirstCompletedRemoteData } from '../../../../core/shared/operators';
import { SearchService } from '../../../../core/shared/search/search.service';
import { hasValue } from '../../../empty.util';
import { HostWindowService } from '../../../host-window.service';
import { HoverClassDirective } from '../../../hover-class.directive';
import { ThemedLoadingComponent } from '../../../loading/themed-loading.component';
import { NotificationsService } from '../../../notifications/notifications.service';
import { CollectionSearchResult } from '../../../object-collection/shared/collection-search-result.model';
import { ListableObject } from '../../../object-collection/shared/listable-object.model';
import {
  ListableObjectComponentLoaderComponent
} from '../../../object-collection/shared/listable-object/listable-object-component-loader.component';
import { SearchResult } from '../../../search/models/search-result.model';
import { followLink } from '../../../utils/follow-link-config.model';
import { DSOSelectorComponent } from '../dso-selector.component';

@Component({
  selector: 'ds-authorized-collection-selector',
  styleUrls: ['../dso-selector.component.scss'],
  templateUrl: '../dso-selector.component.html',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, InfiniteScrollModule, NgIf, NgFor, HoverClassDirective, NgClass, ListableObjectComponentLoaderComponent, ThemedLoadingComponent, AsyncPipe, TranslateModule, NgSwitch,
    NgTemplateOutlet,
    NgbTooltipModule,
    NgSwitchCase,
    NgSwitchDefault
  ],
})
/**
 * Component rendering a list of collections to select from
 */
export class AuthorizedCollectionSelectorComponent extends DSOSelectorComponent {
  /**
   * If present this value is used to filter collection list by entity type
   */
  @Input() entityType: string;

  /** Map to store calls to collection authorization */
  private authorizedCollection: Map<String, Observable<boolean>> = new Map();

  constructor(
    protected searchService: SearchService,
    protected collectionDataService: CollectionDataService,
    protected notifcationsService: NotificationsService,
    protected translate: TranslateService,
    protected dsoNameService: DSONameService,
    protected windowService: HostWindowService,
    protected authorizationService: AuthorizationDataService
  ) {
    super(searchService, notifcationsService, translate, dsoNameService, windowService);
  }

  /**
   * Get a query to send for retrieving the current DSO
   */
  getCurrentDSOQuery(): string {
    return this.currentDSOId;
  }

  /**
   * Perform a search for authorized collections with the current query and page
   * @param query Query to search objects for
   * @param page  Page to retrieve
   * @param useCache Whether or not to use the cache
   */
  search(query: string, page: number, useCache: boolean = true): Observable<RemoteData<PaginatedList<SearchResult<DSpaceObject>>>> {
    let searchListService$: Observable<RemoteData<PaginatedList<Collection>>> = null;
    const findOptions: FindListOptions = {
      currentPage: page,
      elementsPerPage: this.defaultPagination.pageSize,
    };

    searchListService$ = (this.entityType)
      ? this.collectionDataService.getAuthorizedCollectionByEntityType(query, this.entityType, findOptions)
      : this.collectionDataService.getAuthorizedCollection(query, findOptions, useCache, false, followLink('parentCommunity'));
    return searchListService$.pipe(
      getFirstCompletedRemoteData(),
      map((rd) => Object.assign(new RemoteData(null, null, null, null), rd, {
        payload: hasValue(rd.payload)
          ? buildPaginatedList(rd.payload.pageInfo, rd.payload.page.map((col) => Object.assign(new CollectionSearchResult(), { indexableObject: col })))
          : null,
      })),
    );
  }

  /**
   * Determine if an entry should be enabled or not based on authorization return by backend call
   * @param entry The entry object to check (only Collection are check)
   * @return true if the entry should be enabled, false if not.
   */
  isEnabled(entry: ListableObject): Observable<boolean> {
    const isCollection = this.getInstance(entry) instanceof Collection;
    if (!this.allowDisabled || !isCollection) {
      return of(true);
    }

    const collectionID = this.getID(entry);
    if (!this.authorizedCollection.has(collectionID)) {
      const auth$ = this.authorizationService.isAuthorized(FeatureID.CanCreateCollectionWorkspace, (entry as SearchResult<DSpaceObject>).indexableObject.self, undefined, false);
      this.authorizedCollection.set(collectionID, auth$);
    }
    return this.authorizedCollection.get(collectionID)!;
  }
}
