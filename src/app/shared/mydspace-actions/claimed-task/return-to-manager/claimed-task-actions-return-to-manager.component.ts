import { Component } from "@angular/core";
import { ClaimedTaskActionsRejectComponent } from "../reject/claimed-task-actions-reject.component";
import { Observable, of } from "rxjs";
import { RemoteData } from "src/app/core/data/remote-data";
import { DSpaceObject } from "src/app/core/shared/dspace-object.model";
import { ClaimedReturnToManagerTaskSearchResult } from "src/app/shared/object-collection/shared/claimed-return-to-manager-task-search-result.model";
import { NgbTooltipModule } from "@ng-bootstrap/ng-bootstrap";
import { AsyncPipe, NgIf } from "@angular/common";
import { TranslateModule } from "@ngx-translate/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

export const WORKFLOW_TASK_OPTION_RETURN_TO_MANAGER = 'submit_return_to_manager';

/**
 * Component that renders the actions for a claimed task in the workflow, specifically the action to return the task to the manager.
 * 
 * @author Michaël Pourbaix <michael.pourbaix@uclouvain.be>
 */
@Component({
  selector: 'ds-claimed-task-actions-return-to-manager',
  templateUrl: './claimed-task-actions-return-to-manager.component.html',
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
export class ClaimedTaskActionsReturnToManagerComponent extends ClaimedTaskActionsRejectComponent {
  option = WORKFLOW_TASK_OPTION_RETURN_TO_MANAGER;
  
  openRejectModal(content: any) {
    this.rejectForm.reset();
    this.modalRef = this.modalService.open(content, { size: 'lg' });
  }

  reloadObjectExecution(): Observable<RemoteData<DSpaceObject> | DSpaceObject> {
    return of(this.object);
  }

  convertReloadedObject(dso: DSpaceObject): DSpaceObject {
    const reloadedObject = Object.assign(new ClaimedReturnToManagerTaskSearchResult(), dso, {
    indexableObject: dso
    });
    return reloadedObject;
  }
}