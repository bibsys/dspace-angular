import {
  DynamicFormControlLayout,
  serializable,
} from '@ng-dynamic-forms/core';

import {
  DsDynamicInputModel,
  DsDynamicInputModelConfig,
} from '../ds-dynamic-input.model';


export const DYNAMIC_FORM_CONTROL_TYPE_LICENSE_SELECTOR =
  'LICENSE_SELECTOR';


export interface DynamicLicenseSelectorModelConfig
  extends DsDynamicInputModelConfig {
  value?: any;
}


export class DynamicLicenseSelectorModel extends DsDynamicInputModel {

  @serializable()
  readonly type: string = DYNAMIC_FORM_CONTROL_TYPE_LICENSE_SELECTOR;


  constructor(
    config: DynamicLicenseSelectorModelConfig,
    layout?: DynamicFormControlLayout,
  ) {
    super(config, layout);
  }

}
