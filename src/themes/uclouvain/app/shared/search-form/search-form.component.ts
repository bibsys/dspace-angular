import { AsyncPipe, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';

import { SearchFormComponent as BaseComponent } from '../../../../../app/shared/search-form/search-form.component';
import { BrowserOnlyPipe } from '../../../../../app/shared/utils/browser-only.pipe';

@Component({
  selector: 'ds-themed-search-form',
  styleUrls: ['../../../../../app/shared/search-form/search-form.component.scss'],
  templateUrl: './search-form.component.html',
  standalone: true,
  imports: [
    FormsModule,
    NgbTooltipModule,
    AsyncPipe,
    TranslateModule,
    BrowserOnlyPipe,
    NgIf
  ]
})
export class SearchFormComponent extends BaseComponent {
}
