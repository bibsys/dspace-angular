import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { switchMap, take, tap } from 'rxjs/operators';
import { SortDirection, SortOptions } from '../../../core/cache/models/sort-options.model';
import { CommentService } from '../../../core/comment/comment.service';
import { AuthorizationDataService } from '../../../core/data/feature-authorization/authorization-data.service';
import { FeatureID } from '../../../core/data/feature-authorization/feature-id';
import { FindListOptions } from '../../../core/data/find-list-options.model';
import { PaginatedList } from '../../../core/data/paginated-list.model';
import { RemoteData } from '../../../core/data/remote-data';
import { PaginationService } from '../../../core/pagination/pagination.service';
import { Comment } from '../../../core/shared/comment.model';
import { Item } from '../../../core/shared/item.model';
import { getFirstSucceededRemoteData } from '../../../core/shared/operators';
import { PageInfo } from '../../../core/shared/page-info.model';
import { PaginationComponentOptions } from '../../../shared/pagination/pagination-component-options.model';

@Component({
  selector: 'ds-item-comments',
  templateUrl: './list-item-comments.component.html',
})
export class ListItemCommentsPageComponent implements OnInit, OnDestroy {

  // COMPONENT ATTRIBUTES ==============================================================================================
  item: Item;
  comments$: Observable<RemoteData<PaginatedList<Comment>>>;
  commentPageInfo$: Observable<PageInfo>;
  canAddComment$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  canDeleteComment$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  /**
   * The current pagination configuration for the page
   * Currently simply renders all comments
   */
  config: FindListOptions = Object.assign(new FindListOptions(), {
    elementsPerPage: 20,
    currentPage: 1,
    sort: new SortOptions('created', SortDirection.DESC)
  });
  pageConfig: PaginationComponentOptions = Object.assign(new PaginationComponentOptions(), {
    id: 'rcp',  //remoteCommentPagination
    pageSize: 20,
    pageSizeOptions: [20, 40, 60, 80, 100],
  });

  // CONSTRUCTOR && HOOKS ==============================================================================================
  /**
   * Constructor
   * @param route ActivatedRoute
   * @param paginationService PaginationService
   * @param commentService CommentService
   * @param authorizationService AuthService
   */
  constructor(
    protected route: ActivatedRoute,
    protected paginationService: PaginationService,
    protected commentService: CommentService,
    protected authorizationService: AuthorizationDataService
  ) { }

  /** OnInit hook */
  ngOnInit() {

    this.route.data.subscribe(data => {
      if (data.hasOwnProperty('dso')) {
        this.initValues(data.dso.payload as Item);
      }
    });
  }

  private initValues(item: Item) {
    this.item = item;
    this.authorizationService
      .isAuthorized(FeatureID.CanDeleteComment, this.item.self)
      .pipe(take(1))
      .subscribe((isAuthorized: boolean) => (this.canDeleteComment$.next(isAuthorized)));

    this.authorizationService
      .isAuthorized(FeatureID.CanCreateComment, this.item.self)
      .pipe(take(1))
      .subscribe((isAuthorized: boolean) => (this.canAddComment$.next(isAuthorized)));

    this.comments$ = this.paginationService
      .getFindListOptions(this.pageConfig.id, this.config, this.pageConfig)
      .pipe(switchMap((findListOptions: FindListOptions) => {
        return this.commentService
          .getCommentsForItem(this.item.id, findListOptions, false)
          .pipe(
            getFirstSucceededRemoteData(),
            tap(data => {
              if (data?.payload?.pageInfo) {
                this.commentPageInfo$ = of(data.payload.pageInfo);
              }
            })
          );
      }),
    );
  }

  /** OnDestroy hook */
  ngOnDestroy(): void {
    this.paginationService.clearPagination(this.pageConfig.id);
  }

  // COMPONENT METHODS =================================================================================================
  /**
   * Handle event when a comment is deleted; We need to reload the comments
   * @param commentID the UUID of the deleted comment.
   */
  deletedComment(commentID: string) {
    this.paginationService.resetPage(this.pageConfig.id);
  }


}