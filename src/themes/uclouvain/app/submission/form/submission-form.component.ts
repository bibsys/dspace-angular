import { Component } from '@angular/core';
import { SubmissionFormComponent as BaseComponent } from 'src/app/submission/form/submission-form.component';

@Component({
    selector: 'ds-submission-form',
    templateUrl: 'submission-form.component.html',
    styleUrls: ['submission-form.component.scss']
})
export class SubmissionFormComponent extends BaseComponent {}
