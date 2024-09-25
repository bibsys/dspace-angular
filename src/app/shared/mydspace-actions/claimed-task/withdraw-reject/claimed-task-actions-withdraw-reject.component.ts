import { Component } from '@angular/core';
import { ClaimedTaskActionsConfirmAbstractComponent } from '../abstract/claimed-task-actions-confirm-abstract.component';
import { TranslateModule } from '@ngx-translate/core';
import { AsyncPipe, NgIf } from '@angular/common';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

export const WORKFLOW_TASK_OPTION_WITHDRAW_REJECT = 'submit_withdraw_reject';

@Component({
  selector: 'ds-claimed-task-actions-withdraw-reject',
  templateUrl: './claimed-task-actions-withdraw-reject.component.html',
  imports: [
    NgbTooltipModule,
    NgIf,
    AsyncPipe,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  standalone: true,
})
/**
 * Component for displaying and processing the reject && withdraw action on a workflow task item
 */
export class ClaimedTaskActionsWithdrawRejectComponent extends ClaimedTaskActionsConfirmAbstractComponent {
  /**
   * This component represents the reject option
   */
  option = WORKFLOW_TASK_OPTION_WITHDRAW_REJECT;
}
