import { NgClass, NgIf } from "@angular/common";
import { Component, Input, OnInit } from "@angular/core";
import { NgbTooltipModule } from "@ng-bootstrap/ng-bootstrap";
import { TranslateModule } from "@ngx-translate/core";
import { Item } from "src/app/core/shared/item.model";

/**
 * Specific journal field to render the peer reviewed state of the journal.
 * It handles the displayed color and the i18n text depending on the value of the metadata.
 * 
 * @author Michaël Pourbaix <michael.pourbaix@uclouvain.be>
 */
@Component({
  selector: 'ds-journal-peer-reviewed',
  template: `
    <span *ngIf="displayIcon || displayText">
      <i *ngIf="displayIcon" class="fa-solid" [ngClass]="{
        'fa-circle-check peer-reviewed': peerReviewed,
        'fa-circle-xmark not-peer-reviewed':!peerReviewed
      }"></i>
      <span *ngIf="displayText">
        {{ ('journal.listelement.peerreviewed.' + peerReviewed) | translate }}
      </span>
    </span>
  `,
  styles: [`
    .peer-reviewed { color: var(--ds-dark-green); }
    .not-peer-reviewed { color: var(--bs-danger); }
  `],
  standalone: true,
  imports: [
    NgClass,
    TranslateModule,
    NgIf,
    NgbTooltipModule,
  ]
})
export class JournalPeerReviewedComponent implements OnInit {
  @Input() journal: Item;
  @Input() displayIcon: boolean = false;
  @Input() displayText: boolean = true;

  protected peerReviewed: boolean;
  protected readonly peerReviewedField = 'journal.peerReviewed';
  
  ngOnInit(): void {
    // Retrieve the metadata value. If none found, use 'false' by default.
    this.peerReviewed = this.journal.firstMetadataValue(this.peerReviewedField)?.toLowerCase() === 'true';
  }
}