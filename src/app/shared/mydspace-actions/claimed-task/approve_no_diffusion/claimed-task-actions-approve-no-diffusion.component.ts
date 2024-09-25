import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { AsyncPipe, NgIf } from '@angular/common';
import { BtnDisabledDirective } from 'src/app/shared/btn-disabled.directive';
import { ClaimedTaskActionsConfirmAbstractComponent } from '../abstract/claimed-task-actions-confirm-abstract.component';

export const WORKFLOW_TASK_OPTION_APPROVE_NO_DIFFUSION = 'submit_approve_no_diffusion';

@Component({
  selector: 'ds-claimed-task-actions-approve-no-diffusion',
  templateUrl: './claimed-task-actions-approve-no-diffusion.component.html',
  imports: [NgbTooltipModule, NgIf, AsyncPipe, TranslateModule, BtnDisabledDirective, FormsModule, ReactiveFormsModule],
  standalone: true,
})
/**
 * This component renders a button used to accept a submission but with no diffusion.
 * By 'no diffusion' we mean that all the bistreams won't be accessible to anyone except for admins.
 * When the manager clicks on this button, it opens a modal that allows him to confirm his choice.
 */
export class ClaimedTaskActionsApproveNoDiffusionComponent extends ClaimedTaskActionsConfirmAbstractComponent {
  option = WORKFLOW_TASK_OPTION_APPROVE_NO_DIFFUSION;
}
