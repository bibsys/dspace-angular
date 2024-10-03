import { Component } from "@angular/core";
import { ClaimedTaskActionsRejectComponent } from "../reject/claimed-task-actions-reject.component";
import { NgbTooltipModule } from "@ng-bootstrap/ng-bootstrap";
import { AsyncPipe, NgIf } from "@angular/common";
import { TranslateModule } from "@ngx-translate/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";


export const WORKFLOW_TASK_OPTION_RETURN_TO_SUBMITTER = 'submit_return_to_submitter';

@Component({
  selector: 'ds-claimed-task-actions-return-to-submitter',
  templateUrl: './claimed-task-actions-return-to-submitter.component.html',
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
}