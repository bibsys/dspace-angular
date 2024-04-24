import { DynamicFormControlLayout, serializable } from '@ng-dynamic-forms/core';
import { MetadataValue } from 'src/app/core/shared/metadata.models';
import { DynamicDsDatePickerModel, DynamicDsDatePickerModelConfig } from '../date-picker/date-picker.model';

export const DYNAMIC_FORM_CONTROL_TYPE_DSYEARPICKER = 'YEAR';

/**
 * Main model for the 'YearPickerComponent' component.
 * Basically extends the already existing 'DatePickerComponent' model.
 */

export interface DynamicDsYearPickerModelConfig extends DynamicDsDatePickerModelConfig {
    metadataValue: MetadataValue;
    minYearDelta: number;
    maxYearDelta: number;
    defaultValue: number;
}

export class DynamicDsYearPickerModel extends DynamicDsDatePickerModel {
    @serializable() readonly type: string = DYNAMIC_FORM_CONTROL_TYPE_DSYEARPICKER;
    @serializable() minYearDelta: number;
    @serializable() maxYearDelta: number;
    @serializable() defaultValue: number = new Date().getFullYear();

    constructor(config: DynamicDsYearPickerModelConfig, layout?: DynamicFormControlLayout) {
      super(config, layout);
      this.minYearDelta = config?.minYearDelta || 100;
      this.maxYearDelta = config?.maxYearDelta || 2;
    }
}
