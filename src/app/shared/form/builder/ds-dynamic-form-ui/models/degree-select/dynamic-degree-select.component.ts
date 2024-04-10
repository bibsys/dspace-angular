import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { DynamicDegreeSelectModel } from './dynamic-degree-select.model';
import {
  DynamicFormLayoutService,
  DynamicFormValidationService
} from '@ng-dynamic-forms/core';
import { UntypedFormGroup } from '@angular/forms';
import { VocabularyEntry } from 'src/app/core/submission/vocabularies/models/vocabulary-entry.model';
import { FormDynamicUpdateService } from 'src/app/shared/form/dynamic-fields/form.dynamic-update.service';
import { FormBuilderService } from '../../../form-builder.service';
import { DsDynamicEmptySelectComponent } from '../empty-select/dynamic-empty-select.component';
import { isNotEmpty } from '../../../../../empty.util';

export const DEGREE_PART_SEPARATOR = ' - ';
export const DEGREE_CODE_PART_IDX = 0;
export const DEGREE_LABEL_PART_IDX = 1;

/**
 * Allows user to select a master degree into a select box. This master degree is
 * composed with degree code and degree label. When an option is selected, the
 * corresponding degree label field will be updated into the form models.
 *
 * @author renaud.michotte@uclouvain.be
 */
@Component({
    selector: 'ds-dynamic-degree-select',
    templateUrl: './dynamic-degree-select.component.html',
    styleUrls: ['./dynamic-degree-select.component.scss']
})
export class DsDynamicDegreeSelectComponent extends DsDynamicEmptySelectComponent implements OnInit, OnDestroy {

  // COMPONENTS ATTRIBUTES ====================================================
  @Input() bindId = true;
  @Input() group: UntypedFormGroup;
  @Input() model: DynamicDegreeSelectModel;

  @Output() blur: EventEmitter<any> = new EventEmitter<any>();
  @Output() change: EventEmitter<any> = new EventEmitter<any>();
  @Output() focus: EventEmitter<any> = new EventEmitter<any>();

  public degreeLabelField: any;

  // CONSTRUCTOR & HOOKS ======================================================
  /**
   * Constructor
   * @param {DynamicFormLayoutService} layoutService
   * @param {DynamicFormValidationService} validationService
   * @param {FormDynamicUpdateService} formDynamicUpdateService
   * @param {FormBuilderService} formBuilderService
   */
  constructor(
    protected layoutService: DynamicFormLayoutService,
    protected validationService: DynamicFormValidationService,
    protected formDynamicUpdateService: FormDynamicUpdateService,
    protected formBuilderService: FormBuilderService
  ) {
    super(layoutService, validationService, formDynamicUpdateService);
  }

  ngOnInit() {
    super.ngOnInit();

    /* If the model has a value during component initialization, only the
       degree code is present, without degree label. Degree label should be
       available into another "hidden" field. Get value from this related
       field build the "display" value of the option list.
     */
    this.degreeLabelField = this.formBuilderService.getMetadataFieldFromId(this.model.degree_label_fieldId);
    if (isNotEmpty(this.model.value) && isNotEmpty(this.degreeLabelField)) {
      const degreeDisplayValue = [this.model.value, this.degreeLabelField.value].join(DEGREE_PART_SEPARATOR);
      const optionEntry = this.generateVocabularyEntry({
        value: this.model.value.toString(),
        displayed: degreeDisplayValue
      })
      this.setCurrentValue(optionEntry);
      this.optionsList = [optionEntry];
    }
  }

  protected selectOption(option: VocabularyEntry) {
    if (isNotEmpty(option) && isNotEmpty(option.value)) {
      const degreeLabel = this.extractDegreePart(option?.display || option.value, DEGREE_LABEL_PART_IDX);
      if (degreeLabel) {
        this.degreeLabelField.value = degreeLabel;
      }
    }
    super.selectOption(option);
  }

  private extractDegreePart(value: string, idx: number): string | null {
    const parts = value.split(DEGREE_PART_SEPARATOR);
    return (parts !== undefined && parts.length > idx)
      ? parts[idx]
      : null;
  }

}
