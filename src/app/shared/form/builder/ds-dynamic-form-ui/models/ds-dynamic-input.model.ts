import {
  AUTOCOMPLETE_OFF,
  DynamicFormControlLayout,
  DynamicFormControlRelation,
  DynamicInputModel,
  DynamicInputModelConfig,
  serializable,
} from '@ng-dynamic-forms/core';
import { Subject } from 'rxjs';

import { VocabularyOptions } from '../../../../../core/submission/vocabularies/models/vocabulary-options.model';
import {
  hasValue,
  isEmpty,
  isNotEmpty,
  isNotUndefined,
} from '../../../../empty.util';
import { LanguageCode } from '../../models/form-field-language-value.model';
import { FormFieldMetadataValueObject } from '../../models/form-field-metadata-value.model';
import { RelationshipOptions } from '../../models/relationship-options.model';

export interface DsDynamicInputModelConfig extends DynamicInputModelConfig {
  vocabularyOptions?: VocabularyOptions;
  languageCodes?: LanguageCode[];
  language?: string;
  place?: number;
  value?: any;
  typeBindRelations?: DynamicFormControlRelation[];
  relationship?: RelationshipOptions;
  repeatable: boolean;
  metadataFields: string[];
  submissionId: string;
  hasSelectableMetadata: boolean;
  metadataValue?: FormFieldMetadataValueObject;
  isModelOfInnerForm?: boolean;
  hideErrorMessages?: boolean;
  securityLevel?: number;
  securityConfigLevel?: number[];
  toggleSecurityVisibility?: boolean;
  isModelOfNotRepeatableGroup?: boolean;
  hideHint?: boolean;
  help?: string;
  settings?: { [key: string]: string };
}

type Constructor<T> = { new (...args: any[]): T } | Function;

export class DsDynamicInputModel extends DynamicInputModel {

  @serializable() vocabularyOptions: VocabularyOptions;
  @serializable() private _languageCodes: LanguageCode[];
  @serializable() private _language: string;
  @serializable() languageUpdates: Subject<string>;
  @serializable() place: number;
  @serializable() typeBindRelations: DynamicFormControlRelation[];
  @serializable() typeBindHidden = false;
  @serializable() relationship?: RelationshipOptions;
  @serializable() repeatable?: boolean;
  @serializable() metadataFields: string[];
  @serializable() submissionId: string;
  @serializable() hasSelectableMetadata: boolean;
  @serializable() metadataValue: FormFieldMetadataValueObject;
  @serializable() isModelOfInnerForm: boolean;
  @serializable() hideErrorMessages?: boolean;
  @serializable() securityLevel?: number;
  @serializable() securityConfigLevel?: number[];
  @serializable() toggleSecurityVisibility = true;
  @serializable() isModelOfNotRepeatableGroup = false;
  @serializable() hideHint: boolean = false;
  @serializable() help?: string;
  @serializable() settings?: { [key: string]: string };

  constructor(config: DsDynamicInputModelConfig, layout?: DynamicFormControlLayout) {
    super(config, layout);
    this.autoComplete = AUTOCOMPLETE_OFF;
    this.repeatable = config.repeatable;
    this.metadataFields = config.metadataFields;
    this.hint = config.hint;
    this.help = config.help;
    this.readOnly = config.readOnly;
    this.disabled = config.readOnly;
    this.value = config.value;
    this.relationship = config.relationship;
    this.submissionId = config.submissionId;
    this.hasSelectableMetadata = config.hasSelectableMetadata;
    this.metadataValue = config.metadataValue;
    this.place = config.place;
    this.securityLevel = config.securityLevel;
    this.securityConfigLevel = config.securityConfigLevel;
    this.settings = config.settings;
    if (isNotUndefined(config.toggleSecurityVisibility)) {
      this.toggleSecurityVisibility = config.toggleSecurityVisibility;
    }
    if (isNotUndefined(config.isModelOfNotRepeatableGroup)) {
      this.isModelOfNotRepeatableGroup = config.isModelOfNotRepeatableGroup;
    }
    this.isModelOfInnerForm = (hasValue(config.isModelOfInnerForm) ? config.isModelOfInnerForm : false);
    this.hideErrorMessages = config.hideErrorMessages;

    this.language = config.language;
    if (!this.language) {
      // Onebox
      if (config.value instanceof FormFieldMetadataValueObject) {
        this.language = config.value.language;
      } else if (Array.isArray(config.value)) {
        // Tag of Authority
        if (config.value[0].language) {
          this.language = config.value[0].language;
        }
      }
    }
    this.languageCodes = config.languageCodes;

    this.languageUpdates = new Subject<string>();
    this.languageUpdates.subscribe((lang: string) => {
      this.language = lang;
    });

    this.typeBindRelations = config.typeBindRelations ? config.typeBindRelations : [];

    this.vocabularyOptions = config.vocabularyOptions;
    // Add a custom validator to check for requirement only on non-hidden fields.
    this.validators = Object.assign({}, this.validators, { requiredIfVisibleValidator: this });
  }

  get hasAuthority(): boolean {
    return this.vocabularyOptions && hasValue(this.vocabularyOptions.name);
  }

  get hasLanguages(): boolean {
    return this.languageCodes && this.languageCodes.length > 1;
  }

  get language(): string {
    return this._language;
  }

  set language(language: string) {
    this._language = language;
  }

  get hasSecurityLevel(): boolean {
    return isNotEmpty(this.securityLevel);
  }

  get hasSecurityToggle(): boolean {
    return isNotEmpty(this.securityConfigLevel) && this.securityConfigLevel.length > 1 && this.toggleSecurityVisibility;
  }

  get languageCodes(): LanguageCode[] {
    return this._languageCodes;
  }

  set languageCodes(languageCodes: LanguageCode[]) {
    this._languageCodes = languageCodes;
    if (!this.language || this.language === '') {
      this.language = this.languageCodes ? this.languageCodes[0].code : null;
    }
  }

  hasSetting(name: string): boolean {
    return this?.settings && name in this.settings;
  }

  getSetting<T>(name: string, type: Constructor<T> = String): T {
    if (!this.hasSetting(name) || isEmpty(this.settings[name])) {
      return null;
    }
    const settingValue = this.settings[name];
    if (type === String) {
      return settingValue as T;
    }
    // Try to parse the setting as a specific type
    if (type === Boolean) {
      const lowerValue = settingValue.toLowerCase();
      if (lowerValue === "true") return true as T;
      if (lowerValue === "false") return false as T;
      throw new Error(`Cannot parse value '${settingValue}' as boolean`);
    }
    if (type === Number) {
      const parsedNumber = Number(settingValue);
      if (!isNaN(parsedNumber)) return parsedNumber as T;
      throw new Error(`Cannot parse value '${settingValue}' as number`);
    }
    throw new Error(`Unsupported type: ${type}`);
  }
}
