import { AUTOCOMPLETE_OFF, DynamicFormControlLayout, serializable } from '@ng-dynamic-forms/core';
import { DynamicSelectModel } from '../empty-select/dynamic-empty-select.model';
import { DsDynamicInputModelConfig } from '../ds-dynamic-input.model';

export const DYNAMIC_FROM_CONTROL_TYPE_DEGREE_SELECT = 'DEGREE_SELECT';

export class DynamicDegreeSelectModel extends DynamicSelectModel {
    @serializable() readonly type: string = DYNAMIC_FROM_CONTROL_TYPE_DEGREE_SELECT;
    @serializable() readonly degree_label_fieldId: string = 'masterthesis_degree_label';
}
