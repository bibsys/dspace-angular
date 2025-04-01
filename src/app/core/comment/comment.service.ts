import { Injectable } from '@angular/core';
import { FindListOptions } from '../data/find-list-options.model';
import { NoContent } from '../shared/NoContent.model';
import { CommentDataService } from './comment-data.service';
import { Observable } from 'rxjs';
import { RemoteData } from '../data/remote-data';
import { PaginatedList } from '../data/paginated-list.model';
import { Comment } from '../shared/comment.model';

/**
 * Service allowing {@link Comment} management
 *
 * @author Renaud Michotte (renaud.michotte@uclouvain.be)
 */
@Injectable()
export class CommentService {

  constructor(
   protected commentDataService: CommentDataService
  ) { }

  /**
   * Get all comments related to an {@link Item}
   * @param itemUUID the item UUID to search
   * @param options the filter/sort options
   * @param useCachedVersionIfAvailable Is a previous cached response could be used?
   * @param reRequestOnStale Whether or not the request should automatically be re-requested after the response becomes stale
   */
  getCommentsForItem(
    itemUUID: string,
    options: FindListOptions,
    useCachedVersionIfAvailable = true,
    reRequestOnStale = true
  ): Observable<RemoteData<PaginatedList<Comment>>> {
    return this.commentDataService.findAllByParent(itemUUID, options, useCachedVersionIfAvailable, reRequestOnStale);
  }

  /**
   * Create a new comment
   * @param parentID the {@link Item} to which the comment will be linked.
   * @param content the comment content
   */
  create(parentID: string, content: string): Observable<RemoteData<Comment>> {
    const comment: Comment = Object.assign(new Comment(), {'content': content});
    return this.commentDataService.create(comment, parentID);
  }

  /**
   * Delete a comment
   * @param commentID the comment UUID to delete
   */
  delete(commentID: string): Observable<RemoteData<NoContent>> {
    return this.commentDataService.delete(commentID);
  }

  /**
   * Reset the cache for any comments.
   */
  clearCommentRequests(): Observable<string> {
    return this.commentDataService.clearCommentRequests();
  }
}
