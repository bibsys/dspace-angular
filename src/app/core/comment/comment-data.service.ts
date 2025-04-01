import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { CreateDataImpl } from '../data/base/create-data';
import { dataService } from '../data/base/data-service.decorator';
import { DeleteDataImpl } from '../data/base/delete-data';
import { COMMENT } from '../shared/comment.resource-type';
import { Comment } from '../shared/comment.model';
import { IdentifiableDataService } from '../data/base/identifiable-data.service';
import { FollowLinkConfig } from '../../shared/utils/follow-link-config.model';
import { Observable } from 'rxjs';
import { RemoteData } from '../data/remote-data';
import { RequestService } from '../data/request.service';
import { RemoteDataBuildService } from '../cache/builders/remote-data-build.service';
import { ObjectCacheService } from '../cache/object-cache.service';
import { HALEndpointService } from '../shared/hal-endpoint.service';
import { NotificationsService } from '../../shared/notifications/notifications.service';
import { DSONameService } from '../breadcrumbs/dso-name.service';
import { SearchDataImpl } from '../data/base/search-data';
import { FindListOptions } from '../data/find-list-options.model';
import { RequestParam } from '../cache/models/request-param.model';
import { PaginatedList } from '../data/paginated-list.model';
import { NoContent } from '../shared/NoContent.model';

/**
 * A service responsible for fetching/sending data from/to the REST API on the `/api/core/comments` endpoint
 *
 * @author Renaud Michotte (renaud.michotte@uclouvain.be)
 */
@Injectable()
@dataService(COMMENT)
export class CommentDataService extends IdentifiableDataService<Comment>{

  protected readonly searchByParent = 'findAllByParent';

  private searchData: SearchDataImpl<Comment>;
  private createData: CreateDataImpl<Comment>;
  private deleteData: DeleteDataImpl<Comment>;

  constructor(
    protected requestService: RequestService,
    protected rdbService: RemoteDataBuildService,
    protected objectCache: ObjectCacheService,
    protected halService: HALEndpointService,
    protected notificationsService: NotificationsService,
    protected dsoNameService: DSONameService,
  ) {
    super('comments', requestService, rdbService, objectCache, halService);
    this.createData = new CreateDataImpl(this.linkPath, requestService, rdbService, objectCache, halService, notificationsService, this.responseMsToLive);
    this.searchData = new SearchDataImpl(this.linkPath, requestService, rdbService, objectCache, halService, this.responseMsToLive);
    this.deleteData = new DeleteDataImpl(this.linkPath, requestService, rdbService, objectCache, halService, notificationsService, this.responseMsToLive, this.constructIdEndpoint);
  }

  /**
   * Returns an observable of {@link RemoteData} of an object, based on its ID, with a list of
   * {@link FollowLinkConfig}, to automatically resolve {@link HALLink}s of the object
   *
   * @param id ID of object we want to retrieve
   * @param useCachedVersionIfAvailable If this is true, the request will only be sent if there's no valid-cached version. Defaults to true
   * @param reRequestOnStale Whether or not the request should automatically be re-requested after the response becomes stale
   * @param linksToFollow List of {@link FollowLinkConfig} that indicate which {@link HALLink}s should be automatically resolved
   */
  findById(id: string, useCachedVersionIfAvailable = true, reRequestOnStale = true, ...linksToFollow: FollowLinkConfig<Comment>[]): Observable<RemoteData<Comment>> {
    return super.findById(id, useCachedVersionIfAvailable, reRequestOnStale, ...linksToFollow);
  }

  /**
   * Return comments related to a specific parent item (/core/comments/search/{@link findAllByParent}?id=<>)
   * @param itemUUID the parent item UUID
   * @param options find list options object used to filter the search results
   * @param useCachedVersionIfAvailable If this is true, the request will only be sent if there's no valid-cached version. Defaults to true
   * @param reRequestOnStale Whether or not the request should automatically be re-requested after the response becomes stale
   * @param linksToFollow List of {@link FollowLinkConfig} that indicate which {@link HALLink}s should be automatically resolved
   */
  findAllByParent(
    itemUUID: string,
    options: FindListOptions,
    useCachedVersionIfAvailable = true,
    reRequestOnStale = true,
    ...linksToFollow: FollowLinkConfig<Comment>[]
  ): Observable<RemoteData<PaginatedList<Comment>>> {
    const optionsWithObject = Object.assign(new FindListOptions(), options, {
      searchParams: [new RequestParam('id', encodeURIComponent(itemUUID))],
    });
    return this.searchData.searchBy(this.searchByParent, optionsWithObject, useCachedVersionIfAvailable, reRequestOnStale, ...linksToFollow);
  }

  /**
   * Create a new comment on the server, and store the response in the object cache
   * @param comment the {@link Comment} to create
   * @param parentID the UUID of the {@link Item} parent object to which the comment will be linked
   */
  create(comment: Comment, parentID: string): Observable<RemoteData<Comment>> {
    return this.createData.create(comment, new RequestParam('parent', parentID));
  }

  /**
   * Delete a comment on the server.
   * @param commentID the {@link Comment} UUID to delete
   */
  delete(commentID: string): Observable<RemoteData<NoContent>> {
    return this.deleteData.delete(commentID);
  }

  /**
   * Clears the cache of the list of {@link Comment}
   */
  public clearCommentRequests(): Observable<string> {
    return this.getBrowseEndpoint().pipe(
      tap((href: string) => this.requestService.setStaleByHrefSubstring(href)),
    );
  }

}