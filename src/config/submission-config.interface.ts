import { DuplicateMatchMetadataDetailConfig } from '../app/submission/sections/detect-duplicate/models/duplicate-detail-metadata.model';
import { Config } from './config.interface';

interface AutosaveConfig extends Config {
  metadata: string[];
  timer: number;
}

interface DuplicateDetectionConfig extends Config {
  alwaysShowSection: boolean;
}

interface TypeBindConfig extends Config {
  field: string;
}

export interface AuthorithyIcon {
  source: string,
  path: string
}

interface IconsConfig extends Config {
  metadata: MetadataIconConfig[];
  authority: {
    confidence: ConfidenceIconConfig[];
    sourceIcons?: AuthorithyIcon[]
  };
  iconsVisibleWithNoAuthority?: string[]
}

export interface MetadataIconConfig extends Config {
  name: string;
  style: string;
}

export interface ConfidenceIconConfig extends Config {
  value: any;
  style: string;
  icon: string;
}

interface DetectDuplicateConfig extends Config {
  metadataDetailsList: DuplicateMatchMetadataDetailConfig[];
}

export interface SubmissionDropdownHintEnabled {
  [key: string]: boolean

}

export interface DynamicFieldsConfig extends Config {
  triggeringField: string;
  endpoint: string;
  params: DynamicFieldEndpointConfig;
  targetFields: string[];
}

export interface DynamicFieldEndpointConfig extends Config {
  paramKeys: string[];
  metadataFields: string[];
}

export interface SubmissionConfig extends Config {
  autosave: AutosaveConfig;
  duplicateDetection: DuplicateDetectionConfig;
  typeBind: TypeBindConfig;
  icons: IconsConfig;
  detectDuplicate: DetectDuplicateConfig;
  dropdownHintEnabled?: SubmissionDropdownHintEnabled;
  dynamicFields: DynamicFieldsConfig[];
  enableShortcutPanelFor?: string[];  // must contain the collection UUID for which the shortcut panel should be enabled
  disclaimerSectionFor?: string[]; // Provide collection to display a disclaimer when submitting a new item.
}
