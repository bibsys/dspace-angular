import { Component } from '@angular/core';
import { rendersWorkflowTaskOption } from '../switcher/claimed-task-actions-decorator';
import { ClaimedTaskActionsConfirmAbstractComponent } from '../abstract/claimed-task-actions-confirm-abstract.component';
import { DSpaceObject } from 'src/app/core/shared/dspace-object.model';
import { ClaimedApproveWithoutDiffusionTaskSearchResult } from 'src/app/shared/object-collection/shared/claimed-approve-without-diffusion-search-result.model';

export const WORKFLOW_TASK_OPTION_APPROVE_NO_DIFFUSION = 'submit_approve_no_diffusion';

@rendersWorkflowTaskOption(WORKFLOW_TASK_OPTION_APPROVE_NO_DIFFUSION)
@Component({
  selector: 'ds-claimed-task-actions-approve-no-diffusion',
  templateUrl: './claimed-task-actions-approve-no-diffusion.component.html',
})
/**
 * This component renders a button used to accept a submission but with no diffusion.
 * By 'no diffusion' we mean that all the bistreams won't be accessible to anyone except for admins.
 * When the manager clicks on this button, it opens a modal that allows him to confirm his choice.
 */
export class ClaimedTaskActionsApproveNoDiffusionComponent extends ClaimedTaskActionsConfirmAbstractComponent {
  option = WORKFLOW_TASK_OPTION_APPROVE_NO_DIFFUSION;

  convertReloadedObject(dso: DSpaceObject): DSpaceObject {
    const reloadedObject = Object.assign(new ClaimedApproveWithoutDiffusionTaskSearchResult(), dso, {
      indexableObject: dso
    });
    return reloadedObject;
  }
}
