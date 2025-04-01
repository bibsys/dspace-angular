import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CommentService } from '../../../core/comment/comment.service';
import { RemoteData } from '../../../core/data/remote-data';
import { Comment } from '../../../core/shared/comment.model';
import { getFirstCompletedRemoteData } from '../../../core/shared/operators';
import { NotificationsService } from '../../../shared/notifications/notifications.service';
import { NgIf } from '@angular/common';
import { CommentFormComponent } from '../form/comment-form.component';

/**
 * Component used to add a new {@link Comment} on an {@link Item}.
 */
@Component({
  selector: 'ds-add-comment',
  templateUrl: './add-comment.component.html',
  imports: [NgIf, CommentFormComponent, TranslateModule],
  standalone: true,
})
export class AddCommentComponent {

  parentID: string;

  // CONSTRUCTOR & HOOKS ===============================================================================================
  /**
   * Constructor
   * @param route ActivatedRoute
   * @param notificationService NotificationService
   * @param translateService TranslateService
   * @param commentService CommentService
   * @param router Router
   */
  constructor(
    protected route: ActivatedRoute,
    protected notificationService: NotificationsService,
    protected translateService: TranslateService,
    protected commentService: CommentService,
    protected router: Router,
  ) { }

  /** OnInit */
  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params.hasOwnProperty('id')) {
        this.parentID = params['id'];
      }
    });
  }

  // COMPONENT METHODS =================================================================================================
  /**
   * Create a new comment by calling the server & notify user from server response.
   * @param comment the comment to create (should contain the comment content)
   */
  createComment(comment: Comment) {
    this.commentService
      .create(this.parentID, comment.content)
      .pipe(getFirstCompletedRemoteData())
      .subscribe((response: RemoteData<Comment>) => {
        if (response.hasSucceeded) {
          this.notificationService.success(
            this.translateService.get('admin.registries.comments.create.success.head'),
            this.translateService.get('admin.registries.comments.create.success.content')
          );
          this.router.navigate(['/', 'items', this.parentID, 'comments']);
          this.commentService.clearCommentRequests().subscribe();
        } else {
          this.notificationService.error(
            this.translateService.get('admin.registries.comments.create.failure.head'),
            this.translateService.get('admin.registries.comments.create.failure.content')
          );
        }
      },
    );
  }

}