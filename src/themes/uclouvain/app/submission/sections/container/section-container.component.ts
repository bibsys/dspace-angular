import { Component } from '@angular/core';
import { SubmissionSectionContainerComponent as BaseComponent } from 'src/app/submission/sections/container/section-container.component';

@Component({
    selector: 'ds-submission-section-container',
    templateUrl: './section-container.component.html',
    styleUrls: ['./section-container.component.scss']
})
export class SubmissionSectionContainerComponent extends BaseComponent {}
