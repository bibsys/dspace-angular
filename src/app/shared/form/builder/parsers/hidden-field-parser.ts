import { DsDynamicInputModelConfig } from '../ds-dynamic-form-ui/models/ds-dynamic-input.model';
import { FormFieldMetadataValueObject } from '../models/form-field-metadata-value.model';
import { FieldParser } from './field-parser';
import { DynamicHiddenModel } from '../ds-dynamic-form-ui/models/hidden/dynamic-hidden.model';


export class HiddenFieldParser extends FieldParser {

    public modelFactory(fieldValue?: FormFieldMetadataValueObject, label?: boolean) {
        const selectModelConfig: DsDynamicInputModelConfig = this.initModel(null, label);
        selectModelConfig.disabled = selectModelConfig.readOnly;
        this.setValues(selectModelConfig, fieldValue, true);
        return new DynamicHiddenModel(selectModelConfig);
    }
}
