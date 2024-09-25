import { Component } from "@angular/core";
import { rendersWorkflowTaskOption } from "../switcher/claimed-task-actions-decorator";
import { ClaimedTaskActionsConfirmAbstractComponent } from "../abstract/claimed-task-actions-confirm-abstract.component";

export const WORKFLOW_TASK_OPTION_CONFIRM_APPROVE = 'submit_confirm_approve';

@rendersWorkflowTaskOption(WORKFLOW_TASK_OPTION_CONFIRM_APPROVE)
@Component({
    selector: 'ds-claimed-task-actions-confirm-approve',
    templateUrl: './claimed-task-actions-confirm-approve.component.html',
})
export class ClaimedTaskActionsConfirmApproveComponent extends ClaimedTaskActionsConfirmAbstractComponent {
    option = WORKFLOW_TASK_OPTION_CONFIRM_APPROVE;
}