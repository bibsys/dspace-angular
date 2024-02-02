import { MyDSpaceNewSubmissionDropdownComponent } from 'src/app/my-dspace-page/my-dspace-new-submission/my-dspace-new-submission-dropdown/my-dspace-new-submission-dropdown.component';
import { Component } from '@angular/core';
import { AsyncPipe, NgIf } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'ds-new-submission-button',
    templateUrl: './new-submission-button.component.html',
    styleUrls: ['./new-submission-button.component.scss'],
    imports: [NgIf, TranslateModule, AsyncPipe],
    standalone: true,
})
export class NewSubmissionButtonComponent extends MyDSpaceNewSubmissionDropdownComponent{}
