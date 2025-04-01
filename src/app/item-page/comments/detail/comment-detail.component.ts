import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CommentService } from '../../../core/comment/comment.service';
import { RemoteData } from '../../../core/data/remote-data';
import { LocaleService } from '../../../core/locale/locale.service';
import { Comment } from '../../../core/shared/comment.model';
import { NoContent } from '../../../core/shared/NoContent.model';
import { getFirstCompletedRemoteData } from '../../../core/shared/operators';
import { NotificationsService } from '../../../shared/notifications/notifications.service';

/**
 * Component use to display a comment
 *
 * @author Renaud Michotte (renaud.michotte@uclouvain.be)
 */
@Component({
  selector: 'ds-comment-detail',
  styleUrls: ['./comment-detail.component.scss'],
  templateUrl: './comment-detail.component.html',
})
export class CommentDetailComponent implements OnInit {

  readonly UUID_REGEXP = /[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}/;
  readonly REFERENCE_REGEXP = new RegExp(`(\\w+)@(${this.UUID_REGEXP.source}) with name "([^"]+)" :: `);

  @Input() comment: Comment;
  @Input() canDelete$: Observable<boolean>;
  @Output() deleted = new EventEmitter<string>();

  commentContent: string;
  commentReference: {type: string, uuid: string, name: string};
  commentMonthAsString: string;

  // CONSTRUCTOR & HOOKS =============================================================================================
  /**
   * Constructor
   * @param localService LocaleService
   * @param commentService CommentService
   * @param notificationService NotificationsService
   * @param translateService TranslateService
   */
  constructor(
    protected localService: LocaleService,
    protected commentService: CommentService,
    protected notificationService: NotificationsService,
    protected translateService: TranslateService,
  ) { }

  /** OnInit hook */
  ngOnInit() {
    this.commentMonthAsString = this.comment.created.toLocaleDateString(this.localService.getCurrentLanguageCode(), {month: "long"});
    this.commentContent = this.comment.content;

    // try to extract related resource (bitstream, bundle, ...) from comment content.
    // If a resource could be found, then the displayed comment content will be cleaned from this resource.
    const match = this.commentContent.match(this.REFERENCE_REGEXP);
    if (match) {
      this.commentReference = {
        type: match[1],
        uuid: match[2],
        name: match[3]
      };
      this.commentContent = this.commentContent.replace(this.REFERENCE_REGEXP, '').trim();
    }

  }

  // COMPONENT METHODS =================================================================================================
  /** Handle delete comment request */
  deleteComment() {
    this.commentService
      .delete(this.comment.id)
      .pipe(
        getFirstCompletedRemoteData(),
        map((response: RemoteData<NoContent>) => response.hasSucceeded),
      )
      .subscribe((success: boolean) => {
        if (success) {
          this.notificationService.success(
            this.translateService.get('admin.registries.comments.delete.success.head'),
            this.translateService.get('admin.registries.comments.delete.success.content')
          );
          this.deleted.emit(this.comment.id);
        } else {
          this.notificationService.error(
            this.translateService.get('admin.registries.comments.delete.failure.head'),
            this.translateService.get('admin.registries.comments.delete.failure.content')
          );
        }
      });
  }
}