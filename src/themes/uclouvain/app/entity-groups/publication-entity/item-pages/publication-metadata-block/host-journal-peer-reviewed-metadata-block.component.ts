import { Component } from "@angular/core";
import { AbstractMetadataBlockComponent } from "./abstract-metadata-block.component";
import { listableMetadataBlockComponent } from "../listable-metadata-block.decorator";
import { ViewMode } from "src/app/core/shared/view-mode.model";
import { Context } from "src/app/core/shared/context.model";
import { NgIf } from "@angular/common";
import { TranslateModule } from "@ngx-translate/core";

@listableMetadataBlockComponent('text::journal-article', ViewMode.StandalonePage, Context.Any, '*', 32)
@listableMetadataBlockComponent('text::conference-speech', ViewMode.StandalonePage, Context.Any, '*', 32)
@Component({
    template: `
      <ng-container *ngIf="item.firstMetadataValue('publication.serial.peerReviewed') === 'true'">
        <dt>{{ 'journal.listelement.peerreviewed' | translate }}</dt>
        <dd>{{ 'journal.listelement.peerreviewed.true' | translate }}</dd>
      </ng-container>
  `,
  standalone: true,
  imports: [
    NgIf,
    TranslateModule,
  ]
})
export class HostJournalPeerReviewedBlockComponent extends AbstractMetadataBlockComponent {}