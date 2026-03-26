import {
  DsDynamicInstitutionAffiliationSelectModelConfig,
  DynamicInstitutionAffiliationSelectModel
} from '../ds-dynamic-form-ui/models/affiliations/institution/institution-affiliation-select.model';
import { FormFieldMetadataValueObject } from '../models/form-field-metadata-value.model';
import { FieldParser } from './field-parser';
import { getSetting } from './parser.utils';

export class InstitutionAffiliationFieldParser extends FieldParser {

    public modelFactory(fieldValue?: FormFieldMetadataValueObject, label?: boolean) {
        const selectModelConfig: DsDynamicInstitutionAffiliationSelectModelConfig = this.initModel(null, label);
        const rawValues = getSetting(this.configData, 'excludedValues', String);
        selectModelConfig.excludedValues = (rawValues)
          ? new Set(rawValues.split(',').map(s => s.trim()).filter(Boolean)) // Remove possible empty value ex: "a,,b"
          : new Set();
        this.setValues(selectModelConfig, fieldValue, true);
        return new DynamicInstitutionAffiliationSelectModel(selectModelConfig);
    }
}