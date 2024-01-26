import { DynamicDsYearPickerModel, DynamicDsYearPickerModelConfig } from '../ds-dynamic-form-ui/models/year-picker/year-picker.model';
import { FormFieldMetadataValueObject } from '../models/form-field-metadata-value.model';
import { FieldParser } from './field-parser';

/**
 * Parser for the 'YearPickerComponent'.
 * His goal is to instantiate the model for the component with the incoming data from backend.
 */
export class YearFieldParser extends FieldParser {
    public modelFactory(fieldValue?: FormFieldMetadataValueObject, label?: boolean) {
        const inputYearModelConfig: DynamicDsYearPickerModelConfig = this.initModel(null, false, true);
        inputYearModelConfig.legend = this.configData.label;
        inputYearModelConfig.disabled = inputYearModelConfig.readOnly;
        this.setValues(inputYearModelConfig as any, fieldValue);
        return new DynamicDsYearPickerModel(inputYearModelConfig);
    }
}
