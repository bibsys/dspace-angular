import {
  DynamicDsToggleSwitchModel,
  DynamicDsToggleSwitchModelConfig
} from '../ds-dynamic-form-ui/models/toggle-switch/toggle-switch.model';
import { FormFieldMetadataValueObject } from '../models/form-field-metadata-value.model';
import { FieldParser } from './field-parser';
import { getSetting } from './parser.utils';

export class ToggleSwitchFieldParser extends FieldParser {

  public modelFactory(fieldValue?: FormFieldMetadataValueObject, label?: boolean) {
    const checkboxModelConfig: DynamicDsToggleSwitchModelConfig = this.initModel(null, false, true);
    checkboxModelConfig.showFieldLabel = getSetting(this.configData, 'showFieldLabel', Boolean) ?? true;
    this.setValues(checkboxModelConfig as any, fieldValue);
    return new DynamicDsToggleSwitchModel(checkboxModelConfig);
  }
}