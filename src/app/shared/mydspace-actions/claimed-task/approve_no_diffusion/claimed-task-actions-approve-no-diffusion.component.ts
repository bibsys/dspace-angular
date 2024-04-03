import { Component, Injector, OnInit } from '@angular/core';
import { rendersWorkflowTaskOption } from '../switcher/claimed-task-actions-decorator';
import { ClaimedTaskActionsApproveComponent } from '../approve/claimed-task-actions-approve.component';
import { RequestService } from 'src/app/core/data/request.service';
import { SearchService } from 'src/app/core/shared/search/search.service';
import { TranslateService } from '@ngx-translate/core';
import { NotificationsService } from 'src/app/shared/notifications/notifications.service';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { isNotEmpty } from 'src/app/shared/empty.util';

export const WORKFLOW_TASK_OPTION_APPROVE_NO_DIFFUSION = 'submit_approve_no_diffusion';

@rendersWorkflowTaskOption(WORKFLOW_TASK_OPTION_APPROVE_NO_DIFFUSION)
@Component({
  selector: 'ds-claimed-task-actions-approve-no-diffusion',
  templateUrl: './claimed-task-actions-approve-no-diffusion.component.html',
})
/**
 * This component renders a button used to accept a submission but with no diffusion.
 * By 'no diffusion' we mean that all the bistreams won't be accessible to anyone except the admin.
 * When the manager clicks on this button, it opens a modal that allows him to enter a reason explaining why he choose this option.
 */
export class ClaimedTaskActionsApproveNoDiffusionComponent extends ClaimedTaskActionsApproveComponent implements OnInit {
  option = WORKFLOW_TASK_OPTION_APPROVE_NO_DIFFUSION;

  // The form control that handles the reason of the validation with no diffusion.
  public approveForm: FormControl;
  // The initial value used to fill the field by default.
  private initialValue: string;
  public modalRef: NgbModalRef;

  constructor(
    protected injector: Injector,
    protected router: Router,
    protected notificationsService: NotificationsService,
    protected translate: TranslateService,
    protected searchService: SearchService,
    protected requestService: RequestService,
    private modalService: NgbModal
  ){
    super(injector, router, notificationsService, translate, searchService, requestService);
  }

  ngOnInit(): void {
    // Try to retrieve the default form field value from the i18n config.
    this.translate.get('submission.workflow.tasks.claimed.approve-no-diffusion.reason.default')
      .subscribe(
        (translation) => {
          this.initialValue = isNotEmpty(translation) ? translation : '';
          this.approveForm = new FormControl(this.initialValue, Validators.required);
        }
      );
  }

  /**
   * Submit an approve option for the task.
   */
  submitTask(): void {
    this.modalRef.close('Send Button');
    super.submitTask();
  }

  /**
   * Create the request body to approve the workflow task.
   * Includes the reason given by the user.
   */
  createbody(): any {
    const reason = this.approveForm.value;
    return Object.assign(super.createbody(), { reason });
  }

  /**
   * Open the form modal that allows the user to enter a reason for the validation without diffusion.
   *
   * @param content: Object containing the reference to the modal.
   */
  openApproveModal(content: any): void {
    this.approveForm.reset(this.initialValue);
    this.modalRef = this.modalService.open(content);
  }
}
