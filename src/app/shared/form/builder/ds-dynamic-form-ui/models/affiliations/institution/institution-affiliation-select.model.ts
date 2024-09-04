import { serializable } from '@ng-dynamic-forms/core';
import { DsDynamicInputModel } from '../../ds-dynamic-input.model';

export const DYNAMIC_FORM_CONTROL_TYPE_INSTITUTION_AFFILIATION_SELECT = 'INSTITUTION_AFFILIATION_SELECT';

export class DynamicInstitutionAffiliationSelectModel extends DsDynamicInputModel {
    @serializable() readonly type: string = DYNAMIC_FORM_CONTROL_TYPE_INSTITUTION_AFFILIATION_SELECT;
}