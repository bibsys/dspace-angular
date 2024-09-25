import { Component } from '@angular/core';
import { rendersWorkflowTaskOption } from '../switcher/claimed-task-actions-decorator';
import { ClaimedTaskActionsConfirmAbstractComponent } from '../abstract/claimed-task-actions-confirm-abstract.component';

export const WORKFLOW_TASK_OPTION_WITHDRAW_REJECT = 'submit_withdraw_reject';

@rendersWorkflowTaskOption(WORKFLOW_TASK_OPTION_WITHDRAW_REJECT)
@Component({
  selector: 'ds-claimed-task-actions-withdraw-reject',
  templateUrl: './claimed-task-actions-withdraw-reject.component.html',
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
