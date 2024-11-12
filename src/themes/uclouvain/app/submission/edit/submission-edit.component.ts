import { Component } from '@angular/core';
import { SubmissionEditComponent as BaseComponent } from '../../../../../app/submission/edit/submission-edit.component';
import { isNotEmpty } from '../../../../../app/shared/empty.util';

/**
 * This component allows to edit an existing workspaceitem/workflowitem.
 */
@Component({
  selector: 'ds-submission-edit',
  styles: ['.alert { border-left-width: 8px; }'],
  templateUrl: './submission-edit.component.html'
})
export class SubmissionEditComponent extends BaseComponent {
  protected readonly isNotEmpty = isNotEmpty;
}
