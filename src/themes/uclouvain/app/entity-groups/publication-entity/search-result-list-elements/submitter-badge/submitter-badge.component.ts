import { AsyncPipe, NgIf } from "@angular/common";
import { Component, Input, OnInit } from "@angular/core";
import { NgbTooltipModule } from "@ng-bootstrap/ng-bootstrap";
import { TranslateModule } from "@ngx-translate/core";
import { Observable } from "rxjs";
import { DSpaceObject } from "src/app/core/shared/dspace-object.model";
import { Item } from "src/app/core/shared/item.model";
import ItemSubmitterService from "src/app/core/submitter/item-submitter.service";

/**
 * Custom Badge to display the submitter of an item in MyDspace.
 * 
 * @author Michaël Pourbaix <michael.pourbaix@uclouvain.be>
 */
@Component({
  selector: 'ds-submitter-badge',
  template: `
    <span *ngIf="(submitter$ | async) as submitter"
          class="badge text-muted py-1 px-2"
          [ngbTooltip]="'mydspace.submitter' | translate">
      <i class="fa-solid fa-user-pen"></i>
      {{ submitter }}
    </span>
  `,
  styles: ['span {font-size: 0.8rem; line-height: 1.5; box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 0px 1px;}'],
  standalone: true,
  imports: [NgIf, AsyncPipe, TranslateModule, NgbTooltipModule]
})
export class SubmitterBadgeComponent implements OnInit {

  @Input() object: DSpaceObject;

  submitter$: Observable<string>;

  constructor(protected itemSubmitterService: ItemSubmitterService) {}

  ngOnInit(): void {
    if (this.object instanceof Item) {
      this.submitter$ = this.itemSubmitterService.getItemSubmitterEmail(this.object.id);
    }
  }
}