import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DynamicHiddenModel } from './dynamic-hidden.model';
import {
  DynamicFormControlComponent,
  DynamicFormLayoutService,
  DynamicFormValidationService
} from '@ng-dynamic-forms/core';
import { UntypedFormGroup } from '@angular/forms';


/**
 * Create a hidden field into the form. This field will be present into formModel
 * (and could be updated by other components if needed) but no HTML input tag will
 * be included into the DOM.
 *
 * @author renaud.michotte@uclouvain.be
 */
@Component({
    selector: 'ds-dynamic-hidden',
    template: `<!-- nothing to display, this is a hidden field -->`
})
export class DsDynamicHiddenComponent extends DynamicFormControlComponent {

  // COMPONENTS ATTRIBUTES ====================================================
  @Input() bindId = true;
  @Input() group: UntypedFormGroup;
  @Input() model: DynamicHiddenModel;

  @Output() blur: EventEmitter<any> = new EventEmitter<any>();
  @Output() change: EventEmitter<any> = new EventEmitter<any>();
  @Output() focus: EventEmitter<any> = new EventEmitter<any>();

  /**
   * Constructor
   * @param {DynamicFormLayoutService} layoutService
   * @param {DynamicFormValidationService} validationService
   */
  constructor(
    protected layoutService: DynamicFormLayoutService,
    protected validationService: DynamicFormValidationService,
  ) {
    super(layoutService, validationService);
  }
}
