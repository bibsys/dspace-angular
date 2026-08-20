import { Injectable } from '@angular/core';
import { ItemCitations } from '../shared/item-citations.model';
import { RequestService } from './request.service';
import { RemoteDataBuildService } from '../cache/builders/remote-data-build.service';
import { ObjectCacheService } from '../cache/object-cache.service';
import { HALEndpointService } from '../shared/hal-endpoint.service';
import { IdentifiableDataService } from './base/identifiable-data.service';
import { FollowLinkConfig } from 'src/app/shared/utils/follow-link-config.model';
import { map, Observable } from 'rxjs';
import { RequestParam } from '../cache/models/request-param.model';
import { RemoteData } from './remote-data';

/**
 * Main data-service to retrieve citations of an item.
 * 
 * @author Michaël Pourbaix <michael.pourbaix@uclouvain.be>
 */
@Injectable({ providedIn: 'root' })
export class ItemCitationsDataService extends IdentifiableDataService<ItemCitations> {

  constructor(
    protected requestService: RequestService,
    protected rdbService: RemoteDataBuildService,
    protected objectCache: ObjectCacheService,
    protected halService: HALEndpointService,
  ) {
    super('citations', requestService, rdbService, objectCache, halService);
  }

  /**
   * Retrieve a citation for the given item and crosswalk.
   *
   * @param id The id of the item to generate the citation for.
   * @param crosswalk The desired crosswalk to generate the citation.
   * @param useCachedVersionIfAvailable If we want to use the cached response if available.
   * @param reRequestOnStale If we should make a new request when the status of the previous one goes on stale.
   * @param linksToFollow The potential links to follow in the response.
   * @returns An observable of remote data containing the response of form `ItemCitations`.
   */
  findByIdAndCrosswalk(
    id: string,
    crosswalk: string,
    useCachedVersionIfAvailable = true,
    reRequestOnStale = true,
    ...linksToFollow: FollowLinkConfig<ItemCitations>[]
  ): Observable<RemoteData<ItemCitations>> {
    const params: RequestParam[] = [
      new RequestParam('crosswalk', crosswalk)
    ];
    const href$ = this
      .getIDHrefObs(encodeURIComponent(id), ...linksToFollow)
      .pipe(map(href => this.buildHrefWithParams(href, params)));
    return this.findByHref(href$, useCachedVersionIfAvailable, reRequestOnStale, ...linksToFollow);
  }

  /**
   * Retrieve a citation for the given item and format.
   * 
   * @param id The id of the item to generate the citation for.
   * @param style The desired style to generate the citation (apa, chicago, ...)
   * @param format The desired format to generate the citation (html, text, ...)
   * @param useCachedVersionIfAvailable If we want to use the cached response if available.
   * @param reRequestOnStale If we should make a new request when the status of the previous one goes on stale.
   * @param linksToFollow The potential links to follow in the response.
   * @returns An observable of remote data containing the response of form `ItemCitations`.
   */
  findByIdAndStyle(
    id: string,
    style: string,
    format: string,
    useCachedVersionIfAvailable = true,
    reRequestOnStale = true,
    ...linksToFollow: FollowLinkConfig<ItemCitations>[]
  ): Observable<RemoteData<ItemCitations>> {
    const params: RequestParam[] = [
      new RequestParam('style', style),
      new RequestParam('format', format)
    ];
    const href$ = this
      .getIDHrefObs(encodeURIComponent(id), ...linksToFollow)
      .pipe(map(href => this.buildHrefWithParams(href, params)));
    return this.findByHref(href$, useCachedVersionIfAvailable, reRequestOnStale, ...linksToFollow);
  }
}