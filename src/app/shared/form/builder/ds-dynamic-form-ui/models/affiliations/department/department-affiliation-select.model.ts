import { serializable } from '@ng-dynamic-forms/core';
import { DsDynamicInputModel } from '../../ds-dynamic-input.model';

export const DYNAMIC_FORM_CONTROL_TYPE_DEPARTMENT_AFFILIATION_SELECT = 'DEPARTMENT_AFFILIATION_SELECT';

export class DynamicDepartmentAffiliationSelectModel extends DsDynamicInputModel {
    @serializable() readonly type: string = DYNAMIC_FORM_CONTROL_TYPE_DEPARTMENT_AFFILIATION_SELECT;
}