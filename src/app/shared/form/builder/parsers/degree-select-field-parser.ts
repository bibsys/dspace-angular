import { DsDynamicInputModelConfig } from '../ds-dynamic-form-ui/models/ds-dynamic-input.model';
import { FormFieldMetadataValueObject } from '../models/form-field-metadata-value.model';
import { FieldParser } from './field-parser';
import { DynamicDegreeSelectModel } from '../ds-dynamic-form-ui/models/degree-select/dynamic-degree-select.model';


export class DegreeSelectFieldParser extends FieldParser {

    public modelFactory(fieldValue?: FormFieldMetadataValueObject, label?: boolean) {
        const selectModelConfig: DsDynamicInputModelConfig = this.initModel(null, label);
        selectModelConfig.disabled = selectModelConfig.readOnly;
        this.setValues(selectModelConfig, fieldValue, true);
        return new DynamicDegreeSelectModel(selectModelConfig);
    }
}
