import { AUTOCOMPLETE_OFF, DynamicFormControlLayout, serializable } from '@ng-dynamic-forms/core';
import { DsDynamicInputModel, DsDynamicInputModelConfig } from '../ds-dynamic-input.model';

export const DYNAMIC_FROM_CONTROL_TYPE_EMPTY_SELECT = 'EMPTY_SELECT';

export class DynamicSelectModel extends DsDynamicInputModel {
    @serializable() readonly type: string = DYNAMIC_FROM_CONTROL_TYPE_EMPTY_SELECT;

    constructor(config: DsDynamicInputModelConfig, layout?: DynamicFormControlLayout) {
        super(config, layout);

        this.autoComplete = AUTOCOMPLETE_OFF;
    }
}
