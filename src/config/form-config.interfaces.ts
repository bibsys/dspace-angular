import { Config } from './config.interface';

export interface ValidatorMap {
  [validator: string]: string;
}

export interface FormConfig extends Config {
  spellCheck: boolean;
  validatorMap: ValidatorMap;
  fields: FormFieldsConfig;
}

export interface FormFieldsConfig extends Config {
  year: {
    minYearDelta: number;
    maxYearDelta: number;
  };
}
