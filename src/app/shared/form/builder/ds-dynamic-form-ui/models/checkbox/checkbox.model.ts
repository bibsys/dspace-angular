import { DynamicFormControlLayout, serializable } from '@ng-dynamic-forms/core';
import { DsDynamicInputModel, DsDynamicInputModelConfig } from '../ds-dynamic-input.model';

export const DYNAMIC_FORM_CONTROL_TYPE_CUSTOM_CHECKBOX = 'CUSTOM_CHECKBOX';

/**
 * Main model for the 'CheckboxComponent' component.
 * Only adding support for 'legend' and 'checked' properties.
 * 
 * @Author: Michaël Pourbaix <michael.pourbaix@uclouvain.be>
 */

export interface DynamicDsCheckboxModelConfig extends DsDynamicInputModelConfig {
    legend: string;
}

export class DynamicDsCheckboxModel extends DsDynamicInputModel {
    legend: string;
    checked: boolean;
    @serializable() readonly type: string = DYNAMIC_FORM_CONTROL_TYPE_CUSTOM_CHECKBOX;

    constructor(config: DynamicDsCheckboxModelConfig, layout?: DynamicFormControlLayout) {
      super(config, layout);
      this.legend = config.legend;
      this.checked = false;
    }
}