import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { FNRSCategory } from '../../core/shared/fnrs-validation.model';

@Component({
  selector: 'ds-fnrs-validation',
  templateUrl: './fnrs-validation.component.html',
  styleUrls: ['./fnrs-validation.component.scss'],
  standalone: true,
  imports: [
    TranslateModule,
    NgClass,
    NgFor,
    NgIf
  ]
})
export class FnrsValidationComponent {

  @Input() valid: boolean;
  @Input() explanations: FNRSCategory[];

  constructor(protected activeModal: NgbActiveModal) { }
}