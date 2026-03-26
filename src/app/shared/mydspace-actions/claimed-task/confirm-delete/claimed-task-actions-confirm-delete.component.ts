import { Component } from "@angular/core";
import { ClaimedTaskActionsConfirmAbstractComponent } from "../abstract/claimed-task-actions-confirm-abstract.component";
import { NgbTooltipModule } from "@ng-bootstrap/ng-bootstrap";
import { AsyncPipe, NgIf } from "@angular/common";
import { TranslateModule } from "@ngx-translate/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { DSpaceObject } from "src/app/core/shared/dspace-object.model";
import { ClaimedDeletedTaskSearchResult } from "src/app/shared/object-collection/shared/claimed-deleted-task-search-result.model";

export const WORKFLOW_TASK_OPTION_CONFIRM_DELETE = 'submit_confirm_delete';

@Component({
  selector: 'ds-claimed-task-actions-confirm-delete',
  templateUrl: './claimed-task-actions-confirm-delete.component.html',
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
export class ClaimedTaskActionsConfirmDeleteComponent extends ClaimedTaskActionsConfirmAbstractComponent {
  option = WORKFLOW_TASK_OPTION_CONFIRM_DELETE;

  convertReloadedObject(dso: DSpaceObject): DSpaceObject {
    const reloadedObject = Object.assign(new ClaimedDeletedTaskSearchResult(), dso, {
      indexableObject: dso
    });
    return reloadedObject;
  }
}