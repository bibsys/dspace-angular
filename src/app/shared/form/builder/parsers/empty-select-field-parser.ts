import { DsDynamicInputModelConfig } from '../ds-dynamic-form-ui/models/ds-dynamic-input.model';
import { DynamicSelectModel } from '../ds-dynamic-form-ui/models/empty-select/dynamic-empty-select.model';
import { FormFieldMetadataValueObject } from '../models/form-field-metadata-value.model';
import { FieldParser } from './field-parser';


export class EmptySelectFieldParser extends FieldParser {

    public modelFactory(fieldValue?: FormFieldMetadataValueObject, label?: boolean) {
        const selectModelConfig: DsDynamicInputModelConfig = this.initModel(null, label);
        selectModelConfig.disabled = selectModelConfig.readOnly;
        this.setValues(selectModelConfig, fieldValue, true);
        return new DynamicSelectModel(selectModelConfig);
    }
}
