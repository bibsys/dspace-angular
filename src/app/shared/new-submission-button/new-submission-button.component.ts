import { AsyncPipe, NgIf } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { MyDSpaceNewSubmissionDropdownComponent } from 'src/app/my-dspace-page/my-dspace-new-submission/my-dspace-new-submission-dropdown/my-dspace-new-submission-dropdown.component';
import { Component } from '@angular/core';

@Component({
  selector: 'ds-new-submission-button',
  templateUrl: './new-submission-button.component.html',
  standalone: true,
  imports: [
    AsyncPipe,
    NgIf,
    TranslateModule
  ],
  styleUrls: ['./new-submission-button.component.scss']
})
export class NewSubmissionButtonComponent extends MyDSpaceNewSubmissionDropdownComponent{}
