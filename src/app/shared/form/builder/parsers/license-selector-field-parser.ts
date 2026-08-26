import { Inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import {
  CONFIG_DATA,
  FieldParser,
  INIT_FORM_VALUES,
  PARSER_OPTIONS,
  SECURITY_CONFIG,
  SUBMISSION_ID,
} from './field-parser';

import { ParserOptions } from './parser-options';

import { FormFieldMetadataValueObject } from '../models/form-field-metadata-value.model';
import { FormFieldModel } from '../models/form-field.model';

import {
  DynamicLicenseSelectorModel,
} from '../ds-dynamic-form-ui/models/license-selector/dynamic-license-selector.model';


export class LicenseSelectorFieldParser extends FieldParser {

  constructor(
    @Inject(SUBMISSION_ID) submissionId: string,
    @Inject(CONFIG_DATA) configData: FormFieldModel,
    @Inject(INIT_FORM_VALUES) initFormValues,
    @Inject(PARSER_OPTIONS) parserOptions: ParserOptions,
    @Inject(SECURITY_CONFIG) securityConfig: any = null,
    translate: TranslateService,
  ) {
    super(
      submissionId,
      configData,
      initFormValues,
      parserOptions,
      securityConfig,
      translate,
    );
  }


  public modelFactory(
    fieldValue?: FormFieldMetadataValueObject,
    label?: boolean,
  ): any {

    const config = this.initModel(null, label);


    this.setValues(config, fieldValue, true);


    return new DynamicLicenseSelectorModel(config);

  }

}
