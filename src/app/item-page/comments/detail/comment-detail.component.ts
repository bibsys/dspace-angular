import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import * as Diff from 'diff';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CommentService } from '../../../core/comment/comment.service';
import { RemoteData } from '../../../core/data/remote-data';
import { LocaleService } from '../../../core/locale/locale.service';
import { Comment } from '../../../core/shared/comment.model';
import { NoContent } from '../../../core/shared/NoContent.model';
import { getFirstCompletedRemoteData } from '../../../core/shared/operators';
import { NotificationsService } from '../../../shared/notifications/notifications.service';
import { AsyncPipe, DatePipe, NgClass, NgForOf, NgIf, NgTemplateOutlet } from '@angular/common';

/** An interface to manage a `diff` line to display to user */
interface DiffLine {
  text: string;
  type: 'add' | 'remove' | 'update';
  isHeader: boolean;
  originalValue?: string;
  cropIndices?: { start: number; end: number; diffMap: boolean[] };
}

/**
 * Component use to display a comment
 *
 * @author Renaud Michotte (renaud.michotte@uclouvain.be)
 */
@Component({
  selector: 'ds-comment-detail',
  styleUrls: ['./comment-detail.component.scss'],
  templateUrl: './comment-detail.component.html',
  imports: [NgIf, NgTemplateOutlet, TranslateModule, DatePipe, AsyncPipe, NgClass, NgForOf],
  standalone: true,
})
export class CommentDetailComponent implements OnInit {

  readonly UUID_REGEXP = new RegExp(`[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}`);
  readonly REFERENCE_REGEXP = new RegExp(`(\\w+)@(${this.UUID_REGEXP.source}) with name "([^"]+)" :: `);
  readonly DIFF_HEADER_PATTERN = /(@(?:add|remove|update)@@[^[ \n]+\[\d+\])/g;
  readonly DIFF_TAG_PATTERN = /(\[(?:\+|-|s|~-|~\+)\])/g;

  @Input() comment: Comment;
  @Input() canDelete$: Observable<boolean>;
  @Output() deleted = new EventEmitter<string>();

  commentContent: string;
  commentReference: {type: string, uuid: string, name: string};
  commentMonthAsString: string;
  diffLines: DiffLine[];

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
    } else {
      const diffLines = this.parseDiff(this.commentContent);
      if (diffLines!=null && diffLines.length > 0) {
        this.diffLines = diffLines;
      }
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

  // DIFF METHODS ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  /**
   * Parsing the comment content into some diff operations.
   * @param rawContent the comment content
   * @return a list of diff operations if the comment content could be parsed
   */
  private parseDiff(rawContent: string): DiffLine[] {
    if (!rawContent.trim()) {
      return null;
    }
    const operationBlocks = rawContent.split(this.DIFF_HEADER_PATTERN).map(block => block.trim()).filter(p => p.length > 0);
    if (!operationBlocks[0].startsWith('@')) {
      return null;
    }

    const finalLines: DiffLine[] = [];
    let currentType: 'add' | 'remove' | 'update' = null;

    for (const block of operationBlocks) {
      if (block.startsWith('@')) {
        const typeMatch = block.match(/@(add|remove|update)@@/);
        currentType = typeMatch
          ? (typeMatch[1] as any)
          : null;
        finalLines.push({ text: block, type: currentType, isHeader: true });
      } else {
        this.parseOperationBody(block, currentType, finalLines);
      }
    }
    return finalLines;
  }

  private parseOperationBody(body: string, type: any, lines: DiffLine[]) {
    const parts = body.split(this.DIFF_TAG_PATTERN).filter(p => p.length > 0);
    let currentTag = '';

    for (const part of parts) {
      if (this.DIFF_TAG_PATTERN.test(part)) {
        currentTag = part;
      } else {
        const rawValue = part.trim();
        const lineObj: DiffLine = {
          text: null,
          type: type,
          isHeader: false,
          originalValue: rawValue
        };

        if (type === 'update' && currentTag === '[~+]') {
          const prevLine = lines[lines.length - 1];
          if (prevLine && prevLine.text.startsWith('[~-]')) {
            const oldVal = prevLine.originalValue || '';
            const diffChanges = Diff.diffWords(oldVal, rawValue);
            prevLine.text = `[~-] ${this.generateIslandHtml(diffChanges, 'old')}`;
            lineObj.text = `[~+] ${this.generateIslandHtml(diffChanges, 'new')}`;
          }
        } else {
          lineObj.text = `${currentTag} ${this.truncateWords(rawValue, 20)}`;
        }
        lines.push(lineObj);
      }
    }
  }

  private generateIslandHtml(changes: Diff.Change[], mode: 'old' | 'new'): string {
    const radius = 10;
    let result: string[] = [];
    changes.forEach((change, idx) => {
      // Mode OLD : on ignore les "added" / Mode NEW : on ignore les "removed"
      if (mode === 'old' && change.added) return;
      if (mode === 'new' && change.removed) return;
      const isChange = (mode === 'old') ? change.removed : change.added;
      if (isChange) {
        const tag = (mode === 'old') ? 'del' : 'strong';
        result.push(`<${tag}>${this.escapeHtml(change.value)}</${tag}>`);
      } else {
        // Texte inchangé : on applique la truncation si trop long
        const words = change.value.split(/\s+/).filter(w => w.length > 0);
        if (words.length > (radius * 2)) {
          // Trop long ? On montre le début et la fin du bloc
          const startPart = words.slice(0, radius).map(w => this.escapeHtml(w)).join(' ');
          const endPart = words.slice(-radius).map(w => this.escapeHtml(w)).join(' ');
          result.push(`${startPart}...${endPart}`);
        } else {
          result.push(this.escapeHtml(change.value));
        }
      }
    });
    return result.join(' ').replace(/\s+/g, ' ');
  }

  private truncateWords(text: string, limit: number): string {
    const words = text.split(/\s+/);
    if (words.length <= limit) return this.escapeHtml(text);
    return words.slice(0, limit).map(w => this.escapeHtml(w)).join(' ') + '...';
  }

  private escapeHtml(t: string): string {
    return (!t)
      ? ''
      : t.replace(/&/g, "&amp;")
         .replace(/</g, "&lt;")
         .replace(/>/g, "&gt;");
  }
}