import { AsyncPipe, NgIf } from "@angular/common";
import { Component, Input, OnInit } from "@angular/core";
import { NgbTooltipModule } from "@ng-bootstrap/ng-bootstrap";
import { TranslateModule } from "@ngx-translate/core";
import { combineLatest, Observable } from "rxjs";
import { DSpaceObject } from "src/app/core/shared/dspace-object.model";
import { Item } from "src/app/core/shared/item.model";
import ItemSubmitterService from "src/app/core/submitter/item-submitter.service";
import { RoleService } from "src/app/core/roles/role.service";
import { AuthService } from '../../../../../../../app/core/auth/auth.service';

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
      <i *ngIf="!isSubmitter" class="fa-solid fa-triangle-exclamation text-warning highlight-marker"></i>
      <i class="fa-solid fa-user-pen"></i>
      {{ submitter }}
    </span>
  `,
  styleUrls: ['./submitter-badge.component.scss'],
  standalone: true,
  imports: [NgIf, AsyncPipe, TranslateModule, NgbTooltipModule]
})
export class SubmitterBadgeComponent implements OnInit {

  @Input() object: DSpaceObject;

  protected submitter$: Observable<string>;
  protected isSubmitter: boolean = false

  constructor(
    protected itemSubmitterService: ItemSubmitterService,
    protected authService: AuthService,
  ) {}

  ngOnInit(): void {
    if (this.object instanceof Item) {
      this.submitter$ = this.itemSubmitterService.getItemSubmitterEmail(this.object.id);
      const user$ = this.authService.getAuthenticatedUserFromStore();
      combineLatest([this.submitter$, user$]).subscribe(([submitter, user]) => {
        this.isSubmitter = submitter === user.email;
      });
    }
  }
}