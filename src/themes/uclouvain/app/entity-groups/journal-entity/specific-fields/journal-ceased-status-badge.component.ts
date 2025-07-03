import { NgIf } from "@angular/common";
import { Component, Input, OnInit } from "@angular/core";
import { TranslateModule } from "@ngx-translate/core";
import { Item } from "src/app/core/shared/item.model";
import { JOURNAL_STATUS_CODE_CEASED } from "../journal-entity-constants";

/**
 * Displays a badge when the journal status is 'ceased'.
 * 
 * @author Michaël Pourbaix <michael.pourbaix@uclouvain.be>
 */
@Component({
  selector: 'ds-journal-ceased-status-badge',
  template: `
    <div *ngIf="isCeased"
         class="badge rounded text-white p-2 m-0">
      <i class="fa-solid fa-triangle-exclamation"></i>
      <span>
        {{ 'journal.listelement.status.ceased' | translate }}
      </span>
    </div>
  `,
  // Using direct var(--bs-danger) to match the other danger icons (peer-review) color.
  styles: ['.badge { background-color: var(--bs-danger);}'],
  standalone: true,
  imports: [TranslateModule, NgIf],
})
export class JournalCeasedStatusBadge implements OnInit {
  @Input() item: Item;

  protected isCeased: boolean;
  protected readonly statusField = 'journal.statusCode';

  ngOnInit(): void {
    this.isCeased = this.item.firstMetadataValue(this.statusField)?.toLowerCase() === JOURNAL_STATUS_CODE_CEASED;
  }
}