import { NgClass, NgForOf, NgIf, } from '@angular/common';
import { ChangeDetectorRef, Component, Input, } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { tap } from 'rxjs/operators';

import { WorkflowItem } from '../../../../../core/submission/models/workflowitem.model';
import { ClaimedTaskDataService } from '../../../../../core/tasks/claimed-task-data.service';
import { ClaimedTask } from '../../../../../core/tasks/models/claimed-task-object.model';
import { ProcessTaskResponse } from '../../../../../core/tasks/models/process-task-response';
import { NotificationOptions } from '../../../../../shared/notifications/models/notification-options.model';
import { NotificationsService } from '../../../../../shared/notifications/notifications.service';
import {
  getWorkflowItemDeleteRoute,
  getWorkflowItemSendBackRoute,
} from '../../../../../workflowitems-edit-page/workflowitems-edit-page-routing-paths';

@Component({
  selector: 'ds-workflow-item-admin-workflow-actions-element',
  styleUrls: ['./workflow-item-admin-workflow-actions.component.scss'],
  templateUrl: './workflow-item-admin-workflow-actions.component.html',
  standalone: true,
  imports: [NgClass, RouterLink, NgIf, TranslateModule, NgForOf],
})
/**
 * The component for displaying the actions for a list element for a workflow-item on the admin workflow search page
 */
export class WorkflowItemAdminWorkflowActionsComponent {

  /**
   * The workflow item to perform the actions on
   */
  @Input() public wfi: WorkflowItem;

  /**
   * Whether to use small buttons or not
   */
  @Input() public small: boolean;

  @Input() public claimedTaskList: ClaimedTask[];

  constructor(
    private claimedTaskDataService: ClaimedTaskDataService,
    private notificationsService: NotificationsService,
    private translateService: TranslateService,
    private cdr: ChangeDetectorRef
  ) { }


  /**
   * Returns the path to the delete page of this workflow item
   */
  getDeleteRoute(): string {
    return getWorkflowItemDeleteRoute(this.wfi.id);
  }

  /**
   * Returns the path to the send back page of this workflow item
   */
  getSendBackRoute(): string {
    return getWorkflowItemSendBackRoute(this.wfi.id);
  }

  /** Unassign a claimed task. */
  returnToPoolTask(task: ClaimedTask): void {
    this.claimedTaskDataService
      .returnToPoolTask(task.id)
      .pipe(tap((response: ProcessTaskResponse) => this.handleResponse(response)))
      .subscribe((response: ProcessTaskResponse) => {
        if (response.hasSucceeded) {
          // remove the corresponding claim task from the list
          this.claimedTaskList = this.claimedTaskList.filter(t => t.id !== task.id);
          this.cdr.detectChanges();
        }
      });
  }

  private handleResponse(response: ProcessTaskResponse) {
    if (response.hasSucceeded) {
      this.notificationsService.success(null,
        this.translateService.get('admin.workflow.item.unassign.success'),
        new NotificationOptions(5000, false),
      );
    } else {
      this.notificationsService.error(null,
        this.translateService.get('admin.workflow.item.unassign.error'),
        new NotificationOptions(20000, true));
    }
  }

}
