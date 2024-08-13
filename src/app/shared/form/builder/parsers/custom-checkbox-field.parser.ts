import { DynamicDsCheckboxModel, DynamicDsCheckboxModelConfig } from "../ds-dynamic-form-ui/models/checkbox/checkbox.model";
import { FormFieldMetadataValueObject } from "../models/form-field-metadata-value.model";
import { FieldParser } from "./field-parser";

/**
 * Parser for a custom checkbox field. 
 */
export class CheckboxFieldParser extends FieldParser {
    public modelFactory(fieldValue?: FormFieldMetadataValueObject, label?: boolean) {
        const checkboxModelConfig: DynamicDsCheckboxModelConfig = this.initModel(null, false, true);
        this.setValues(checkboxModelConfig as any, fieldValue);
        return new DynamicDsCheckboxModel(checkboxModelConfig);
    }
}