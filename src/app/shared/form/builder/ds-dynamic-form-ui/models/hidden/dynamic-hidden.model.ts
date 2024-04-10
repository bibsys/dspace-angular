import { DynamicFormControlLayout, serializable } from '@ng-dynamic-forms/core';
import { DsDynamicInputModel, DsDynamicInputModelConfig } from '../ds-dynamic-input.model';

export const DYNAMIC_FROM_CONTROL_TYPE_HIDDEN = 'HIDDEN';

export class DynamicHiddenModel extends DsDynamicInputModel {
    @serializable() readonly type: string = DYNAMIC_FROM_CONTROL_TYPE_HIDDEN;

    constructor(config: DsDynamicInputModelConfig, layout?: DynamicFormControlLayout) {
        super(config, layout);
        this.hidden = true;
    }
}
