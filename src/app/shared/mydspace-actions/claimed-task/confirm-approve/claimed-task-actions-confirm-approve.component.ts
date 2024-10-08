import { Component } from "@angular/core";
import { ClaimedTaskActionsConfirmAbstractComponent } from "../abstract/claimed-task-actions-confirm-abstract.component";
import { NgbTooltipModule } from "@ng-bootstrap/ng-bootstrap";
import { AsyncPipe, NgIf } from "@angular/common";
import { TranslateModule } from "@ngx-translate/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { DSpaceObject } from "src/app/core/shared/dspace-object.model";
import { ClaimedApprovedTaskSearchResult } from "src/app/shared/object-collection/shared/claimed-approved-task-search-result.model";

export const WORKFLOW_TASK_OPTION_CONFIRM_APPROVE = 'submit_confirm_approve';

@Component({
    selector: 'ds-claimed-task-actions-confirm-approve',
    templateUrl: './claimed-task-actions-confirm-approve.component.html',
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
export class ClaimedTaskActionsConfirmApproveComponent extends ClaimedTaskActionsConfirmAbstractComponent {
    option = WORKFLOW_TASK_OPTION_CONFIRM_APPROVE;

    convertReloadedObject(dso: DSpaceObject): DSpaceObject {
        const reloadedObject = Object.assign(new ClaimedApprovedTaskSearchResult(), dso, {
          indexableObject: dso
        });
        return reloadedObject;
    }
}