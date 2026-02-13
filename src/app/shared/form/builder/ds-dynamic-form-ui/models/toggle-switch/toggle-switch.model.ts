import { DynamicFormControlLayout, serializable } from '@ng-dynamic-forms/core';
import { DsDynamicInputModel, DsDynamicInputModelConfig } from '../ds-dynamic-input.model';

export const DYNAMIC_FORM_CONTROL_TYPE_TOGGLE_SWITCH = 'TOGGLE_SWITCH';

/** Main model for the 'ToggleSwitchComponent' component. */
export interface DynamicDsToggleSwitchModelConfig extends DsDynamicInputModelConfig {
  showFieldLabel: boolean;
}

export class DynamicDsToggleSwitchModel extends DsDynamicInputModel {
  checked: boolean;
  @serializable() readonly type: string = DYNAMIC_FORM_CONTROL_TYPE_TOGGLE_SWITCH;
  @serializable() hideHint: boolean = true;
  @serializable() showFieldLabel: boolean = false;

  constructor(config: DynamicDsToggleSwitchModelConfig, layout?: DynamicFormControlLayout) {
    super(config, layout);
    this.checked = false;
    this.showFieldLabel = config?.showFieldLabel;
  }
}