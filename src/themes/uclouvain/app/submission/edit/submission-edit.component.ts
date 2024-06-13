import { Component } from '@angular/core';
import { SubmissionEditComponent as BaseComponent } from '../../../../../app/submission/edit/submission-edit.component';
import { SubmissionFormComponent } from 'src/app/submission/form/submission-form.component';
import { TranslateModule } from '@ngx-translate/core';

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
  ],
  standalone: true
})
export class SubmissionEditComponent extends BaseComponent {
}
