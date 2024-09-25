import { Component } from "@angular/core";
import { ClaimedTaskActionsConfirmAbstractComponent } from "../abstract/claimed-task-actions-confirm-abstract.component";
import { NgbTooltipModule } from "@ng-bootstrap/ng-bootstrap";
import { AsyncPipe, NgIf } from "@angular/common";
import { TranslateModule } from "@ngx-translate/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

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
}