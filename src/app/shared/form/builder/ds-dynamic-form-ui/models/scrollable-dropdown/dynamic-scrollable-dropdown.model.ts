import { AUTOCOMPLETE_OFF, DynamicFormControlLayout, serializable } from '@ng-dynamic-forms/core';
import { DsDynamicInputModel, DsDynamicInputModelConfig } from '../ds-dynamic-input.model';
import { VocabularyOptions } from '../../../../../../core/submission/vocabularies/models/vocabulary-options.model';

export const DYNAMIC_FORM_CONTROL_TYPE_SCROLLABLE_DROPDOWN = 'SCROLLABLE_DROPDOWN';

export interface DynamicScrollableDropdownModelConfig extends DsDynamicInputModelConfig {
  vocabularyOptions: VocabularyOptions;
  maxOptions?: number;
  value?: any;
  cleanable: boolean;
  defaultValue?: string;
}

export class DynamicScrollableDropdownModel extends DsDynamicInputModel {

  @serializable() maxOptions: number;
  @serializable() readonly type: string = DYNAMIC_FORM_CONTROL_TYPE_SCROLLABLE_DROPDOWN;
  @serializable() defaultValue: string;

  constructor(config: DynamicScrollableDropdownModelConfig, layout?: DynamicFormControlLayout) {

    super(config, layout);

    this.autoComplete = AUTOCOMPLETE_OFF;
    this.vocabularyOptions = config.vocabularyOptions;
    this.maxOptions = config.maxOptions || 10;
  }

}

export class DynamicScrollableDropdownSessionModel extends DynamicScrollableDropdownModel {
  @serializable() cleanable = false;  // masterthesis.session field isn't cleanable with a "trash button"

  constructor(config, layout?) {
    super(config, layout);
    if (config.name === 'masterthesis.session') {
      switch (new Date().getMonth() + 1) {
        case 1: this.defaultValue = 'January'; break;
        case 2:
        case 3:
        case 4:
        case 5:
        case 6: this.defaultValue = 'June'; break;
        case 7:
        case 8:
        case 9: this.defaultValue = 'September'; break;
        case 10:
        case 11:
        case 12: this.defaultValue = 'January'; break;
      }
    }
  }
}