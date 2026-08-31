import { Component, Input } from '@angular/core';
import { AccessConditionObject } from '../../../../../app/core/submission/models/access-condition.model';
import { isNotEmpty } from '../../../../../app/shared/empty.util';
import {
  SubmissionUploadFileAccessConditionObject
} from '../../../../../app/core/submission/models/submission-upload-file-access-condition.model';
import { AsyncPipe, NgClass, NgFor, NgIf } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

/**
 * Component used to display all resource policies related to a {@Bitstream} or {@Item}.
 * Every policy is displayed as a bootstrap colored badge with an additional icon.
 */
@Component({
  selector: 'ds-access-conditions',
  template: `
      <ng-container *ngFor="let access of accessConditions; let last=last">
        <span class="badge px-2 py-1" [ngClass]="getAccessConditionBadgeColor(access)">
            <i *ngIf="showIcon" class="fa mr-1" [ngClass]="getAccessConditionIcon(access)"></i>
            {{ 'access.condition.value.' + access.name | translate }}
            <ng-container *ngIf="isNotEmpty(access.startDate)"> {{ 'until' | translate }} {{access.startDate}}</ng-container>
        </span>
      <i *ngIf="!last" class="fa fa-plus-circle text-dark mx-2" aria-hidden="true"></i>
  </ng-container>`,
  imports: [
    NgFor,
    NgIf,
    AsyncPipe,
    TranslateModule,
    NgClass,
  ],
  standalone: true,
})
export class AccessConditionsComponent {
  @Input() accessConditions: Array<AccessConditionObject>;
  @Input() showIcon = true;
  protected readonly isNotEmpty = isNotEmpty;

  getAccessConditionBadgeColor(access: SubmissionUploadFileAccessConditionObject) {
    switch (access.name.toLowerCase()) {
      case 'openaccess': return 'badge-success';
      case 'administrator': return 'badge-danger';
      case 'embargo':
      case 'lease': return 'badge-secondary';
      default: return 'badge-warning';
    }
  }

  getAccessConditionIcon(access: SubmissionUploadFileAccessConditionObject) {
    switch (access.name.toLowerCase()) {
      case 'openaccess': return 'fa-lock-open';
      case 'administrator': return 'fa-lock';
      default: return 'fa-unlock-alt';
    }
  }
}