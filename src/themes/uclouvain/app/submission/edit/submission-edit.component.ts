import { Component } from '@angular/core';
import { SubmissionEditComponent as BaseComponent } from '../../../../../app/submission/edit/submission-edit.component';
import { SubmissionFormComponent } from 'src/app/submission/form/submission-form.component';
import { TranslateModule } from '@ngx-translate/core';
import { isNotEmpty } from '../../../../../app/shared/empty.util';
import { AlertComponent } from 'src/app/shared/alert/alert.component';
import { NgIf } from '@angular/common';

/**
 * This component allows to edit an existing workspaceitem/workflowitem.
 */
@Component({
  selector: 'ds-themed-submission-edit',
  styles: ['.alert { border-left-width: 8px; }'],
  templateUrl: './submission-edit.component.html',
  imports: [
    SubmissionFormComponent,
    TranslateModule,
    AlertComponent,
    NgIf,
  ],
  standalone: true
})
export class SubmissionEditComponent extends BaseComponent {
  protected readonly isNotEmpty = isNotEmpty;
}
