import { DynamicDsYearPickerModel, DynamicDsYearPickerModelConfig } from '../ds-dynamic-form-ui/models/year-picker/year-picker.model';
import { FormFieldMetadataValueObject } from '../models/form-field-metadata-value.model';
import { FieldParser } from './field-parser';
import { getSetting } from './parser.utils';

/**
 * Parser for the 'YearPickerComponent'.
 * His goal is to instantiate the model for the component with the incoming data from backend.
 */
export class YearFieldParser extends FieldParser {
    public modelFactory(fieldValue?: FormFieldMetadataValueObject, label?: boolean) {
        const inputYearModelConfig: DynamicDsYearPickerModelConfig = this.initModel(null, false, true);
        inputYearModelConfig.legend = this.configData.label;
        inputYearModelConfig.disabled = inputYearModelConfig.readOnly;
        inputYearModelConfig.useCurrentYear = getSetting(this.configData, 'useCurrentYearAsDefault', Boolean) || false;
        inputYearModelConfig.minYearDelta = getSetting(this.configData, 'minYearDelta', Number);
        inputYearModelConfig.maxYearDelta = getSetting(this.configData, 'maxYearDelta', Number);
        inputYearModelConfig.minYear = getSetting(this.configData, 'minYear', Number);
        inputYearModelConfig.maxYear = getSetting(this.configData, 'maxYear', Number);

        this.setValues(inputYearModelConfig as any, fieldValue);
        return new DynamicDsYearPickerModel(inputYearModelConfig);
    }
}
