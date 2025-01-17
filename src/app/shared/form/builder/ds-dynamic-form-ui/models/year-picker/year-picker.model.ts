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
    minYear: number;
    maxYear: number;
    useCurrentYear: boolean;
}

export class DynamicDsYearPickerModel extends DynamicDsDatePickerModel {
    @serializable() readonly type: string = DYNAMIC_FORM_CONTROL_TYPE_DSYEARPICKER;
    @serializable() minYearDelta: number;
    @serializable() maxYearDelta: number;
    @serializable() minYear: number;
    @serializable() maxYear: number;
    @serializable() useCurrentYear: boolean = false;

    constructor(config: DynamicDsYearPickerModelConfig, layout?: DynamicFormControlLayout) {
      super(config, layout);
      this.minYearDelta = config?.minYearDelta;
      this.maxYearDelta = config?.maxYearDelta;
      this.minYear = config?.minYear;
      this.maxYear = config?.maxYear;
      this.useCurrentYear = config?.useCurrentYear;
    }
}