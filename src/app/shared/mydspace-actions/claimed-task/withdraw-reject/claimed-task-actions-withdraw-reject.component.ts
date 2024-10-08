import { Component } from '@angular/core';
import { rendersWorkflowTaskOption } from '../switcher/claimed-task-actions-decorator';
import { ClaimedTaskActionsConfirmAbstractComponent } from '../abstract/claimed-task-actions-confirm-abstract.component';
import { DSpaceObject } from 'src/app/core/shared/dspace-object.model';
import { ClaimedDeclinedTaskSearchResult } from 'src/app/shared/object-collection/shared/claimed-declined-task-search-result.model';

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

    convertReloadedObject(dso: DSpaceObject): DSpaceObject {
        const reloadedObject = Object.assign(new ClaimedDeclinedTaskSearchResult(), dso, {
            indexableObject: dso
        });
        return reloadedObject;
    }
}
