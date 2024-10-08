import { Component } from "@angular/core";
import { rendersWorkflowTaskOption } from "../switcher/claimed-task-actions-decorator";
import { ClaimedTaskActionsRejectComponent } from "../reject/claimed-task-actions-reject.component";
import { DSpaceObject } from "src/app/core/shared/dspace-object.model";
import { RemoteData } from "src/app/core/data/remote-data";
import { Observable, of } from "rxjs";
import { ClaimedChangeRequestTaskSearchResult } from "src/app/shared/object-collection/shared/claimed-change-request-task-search-result.model";


export const WORKFLOW_TASK_OPTION_RETURN_TO_SUBMITTER = 'submit_return_to_submitter';

@rendersWorkflowTaskOption(WORKFLOW_TASK_OPTION_RETURN_TO_SUBMITTER)
@Component({
  selector: 'ds-claimed-task-actions-return-to-submitter',
  templateUrl: './claimed-task-actions-return-to-submitter.component.html',
})
/**
 * Component to render the return to submitter action on a workflow task item.
 */
export class ClaimedTaskActionsReturnToSubmitterComponent extends ClaimedTaskActionsRejectComponent {
  option = WORKFLOW_TASK_OPTION_RETURN_TO_SUBMITTER;

  /**
   * Open modal
   * @param content
   */
  openRejectModal(content: any) {
    this.rejectForm.reset();
    this.modalRef = this.modalService.open(content, { size: 'lg' });
  }

  reloadObjectExecution(): Observable<RemoteData<DSpaceObject> | DSpaceObject> {
    return of(this.object);
  }

  convertReloadedObject(dso: DSpaceObject): DSpaceObject {
    const reloadedObject = Object.assign(new ClaimedChangeRequestTaskSearchResult(), dso, {
      indexableObject: dso
    });
    return reloadedObject;
  }
}