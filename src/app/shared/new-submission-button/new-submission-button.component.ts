import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MyDSpaceNewSubmissionDropdownComponent } from 'src/app/my-dspace-page/my-dspace-new-submission/my-dspace-new-submission-dropdown/my-dspace-new-submission-dropdown.component';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'ds-new-submission-button',
    templateUrl: './new-submission-button.component.html',
    styleUrls: ['./new-submission-button.component.scss']
})
export class NewSubmissionButtonComponent extends MyDSpaceNewSubmissionDropdownComponent implements OnInit {

  canSubmit$: Observable<boolean>;

  ngOnInit() {
    super.ngOnInit();
    this.canSubmit$ = combineLatest([this.initialized$, this.authorized$])
      .pipe(map(([initialized, authorized]) => initialized && authorized));
  }
}
