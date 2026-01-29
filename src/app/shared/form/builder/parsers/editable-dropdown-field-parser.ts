import { DynamicFormControlLayout } from "@ng-dynamic-forms/core";
import { FormFieldMetadataValueObject } from "../models/form-field-metadata-value.model";
import { DropdownFieldParser } from "./dropdown-field-parser";
import { isNotEmpty } from "src/app/shared/empty.util";
import { DynamicScrollableDropdownModel, DynamicScrollableDropdownModelConfig } from "../ds-dynamic-form-ui/models/scrollable-dropdown/dynamic-scrollable-dropdown.model";

/**
 * Custom field parser for custom "editable" dropdown behavior.
 * This is basically a clone of {@link DropdownFieldParser} which sets the 'editable' property to true.
 * 
 * @author Michaël Pourbaix <michael.pourbaix@uclouvain.be>
 */
export class EditableDropdownFieldParser extends DropdownFieldParser {

  public modelFactory(fieldValue?: FormFieldMetadataValueObject, label?: boolean): any {
    const dropdownModelConfig: DynamicScrollableDropdownModelConfig = this.initModel(null, label);
    let layout: DynamicFormControlLayout;
    console.log(this.configData);
    if (isNotEmpty(this.configData.selectableMetadata[0].controlledVocabulary)) {
      this.setVocabularyOptions(dropdownModelConfig, this.parserOptions.collectionUUID);
      this.setValues(dropdownModelConfig, fieldValue, true);
      layout = {
        element: {
          control: 'col',
        },
        grid: {
          host: 'col',
        },
      };
      const dropdownModel = new DynamicScrollableDropdownModel(dropdownModelConfig, layout, true);
      return dropdownModel;
    } else {
      throw Error(`Controlled Vocabulary name is not available. Please check the form configuration file.`);
    }
  }
}