import { Component } from "@angular/core";
import { rendersWorkflowTaskOption } from "../switcher/claimed-task-actions-decorator";
import { ClaimedTaskActionsConfirmAbstractComponent } from "../abstract/claimed-task-actions-confirm-abstract.component";
import { DSpaceObject } from "src/app/core/shared/dspace-object.model";
import { ClaimedApprovedTaskSearchResult } from "src/app/shared/object-collection/shared/claimed-approved-task-search-result.model";

export const WORKFLOW_TASK_OPTION_CONFIRM_APPROVE = 'submit_confirm_approve';

@rendersWorkflowTaskOption(WORKFLOW_TASK_OPTION_CONFIRM_APPROVE)
@Component({
    selector: 'ds-claimed-task-actions-confirm-approve',
    templateUrl: './claimed-task-actions-confirm-approve.component.html',
})
export class ClaimedTaskActionsConfirmApproveComponent extends ClaimedTaskActionsConfirmAbstractComponent {
    option = WORKFLOW_TASK_OPTION_CONFIRM_APPROVE;

    convertReloadedObject(dso: DSpaceObject): DSpaceObject {
        const reloadedObject = Object.assign(new ClaimedApprovedTaskSearchResult(), dso, {
          indexableObject: dso
        });
        return reloadedObject;
    }
}