import { DsDynamicInputModelConfig } from '../ds-dynamic-form-ui/models/ds-dynamic-input.model';
import { DynamicDepartmentAffiliationSelectModel } from '../ds-dynamic-form-ui/models/affiliations/department/department-affiliation-select.model';
import { FormFieldMetadataValueObject } from '../models/form-field-metadata-value.model';
import { FieldParser } from './field-parser';


export class DepartmentAffiliationFieldParser extends FieldParser {

    public modelFactory(fieldValue?: FormFieldMetadataValueObject, label?: boolean) {
        const selectModelConfig: DsDynamicInputModelConfig = this.initModel(null, label);
        this.setValues(selectModelConfig, fieldValue, true);
        return new DynamicDepartmentAffiliationSelectModel(selectModelConfig);
    }
}