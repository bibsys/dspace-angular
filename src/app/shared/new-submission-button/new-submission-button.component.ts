import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MyDSpaceNewSubmissionDropdownComponent } from 'src/app/my-dspace-page/my-dspace-new-submission/my-dspace-new-submission-dropdown/my-dspace-new-submission-dropdown.component';
import { Component, OnInit } from '@angular/core';
import { AsyncPipe, NgIf } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'ds-new-submission-button',
    templateUrl: './new-submission-button.component.html',
    styleUrls: ['./new-submission-button.component.scss'],
    imports: [NgIf, TranslateModule, AsyncPipe, NgbTooltipModule],
    standalone: true,
})
export class NewSubmissionButtonComponent extends MyDSpaceNewSubmissionDropdownComponent implements OnInit {

  canSubmit$: Observable<boolean>;

  ngOnInit() {
    super.ngOnInit();
    this.canSubmit$ = combineLatest([this.initialized$, this.authorized$])
      .pipe(map(([initialized, authorized]) => initialized && authorized));
  }
}
