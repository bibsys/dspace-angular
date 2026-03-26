import { DynamicFormControlLayout, serializable } from '@ng-dynamic-forms/core';
import { DsDynamicInputModel, DsDynamicInputModelConfig } from '../../ds-dynamic-input.model';

export const DYNAMIC_FORM_CONTROL_TYPE_INSTITUTION_AFFILIATION_SELECT = 'INSTITUTION_AFFILIATION_SELECT';

export interface DsDynamicInstitutionAffiliationSelectModelConfig extends DsDynamicInputModelConfig {
  excludedValues: Set<string>;
}

export class DynamicInstitutionAffiliationSelectModel extends DsDynamicInputModel {
    readonly autoComplete = 'off';
    readonly excludedValues: Set<string>;
    @serializable() readonly type: string = DYNAMIC_FORM_CONTROL_TYPE_INSTITUTION_AFFILIATION_SELECT;

  constructor(config: DsDynamicInstitutionAffiliationSelectModelConfig, layout?: DynamicFormControlLayout) {
    super(config, layout);
    this.excludedValues = new Set(config?.excludedValues || []);
  }
}