import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { DynamicInstitutionAffiliationSelectModel } from "./institution-affiliation-select.model";
import { filter } from "rxjs";
import { VocabularyEntry } from "src/app/core/submission/vocabularies/models/vocabulary-entry.model";
import { isEmpty } from "src/app/shared/empty.util";
import { AffiliationData } from "src/app/core/data/publication-affiliation-data.service";
import { FormFieldMetadataValueObject } from "../../../../models/form-field-metadata-value.model";
import { AffiliationSelectComponent } from "../affiliation-select.component";
import { AffiliationUpdateData } from "src/app/core/data/publication-affiliation-field-update.service";


/**
 * Main institution component used to display all the root institutions in a select field.
 * When the component is initialized, it fetches the affiliation tree from the backend and displays as select field options containing the root elements.
 * When the user clicks on an option, the component processes its children and sends them to the department component via an Subject event.
 * The user can also type in whatever value he wants. In this case the component sends an empty list to the department component.
 * 
 * @Author: Michaël Pourbaix <michael.pourbaix@uclouvain.be>
 */
@Component({
  selector: 'ds-institution-affiliation-select',
  styleUrls: ['../../scrollable-dropdown/dynamic-scrollable-dropdown.component.scss'],
  templateUrl: './institution-affiliation-select.component.html'
})
export class DsDynamicInstitutionAffiliationComponent extends AffiliationSelectComponent implements OnInit, OnDestroy {

  @Input() model: DynamicInstitutionAffiliationSelectModel;

  public affiliationsList: AffiliationData[]; 
  public optionsList: VocabularyEntry[] = [];

  public ngOnInit(): void {
    let modelValue: any = this.model.value;
    if (!isEmpty(modelValue)) {
      this.setCurrentValue(this.model.value);
    }
    this.subscriptions.push(
      // Fetch the root affiliations to display them in the select options.
      this.publicationAffiliationDataService.getAffiliationsTree().subscribe(
        (affiliations: any) => {
          if (!isEmpty(affiliations)) {
            this.affiliationsList = affiliations;
            this.optionsList = this.affiliationsList.map((affiliation: AffiliationData) => this.generateVocabularyEntry(affiliation));
            if (!isEmpty(modelValue) && !isEmpty(modelValue.authority)) {
              // If we have a model value we can check if it is in the options list and select it.
              this.selectAuthorityIfAvailable(modelValue.authority, false);
            }
          }
        }
      ),
      // Subscription to watch for changes in the form group && update the current value.
      this.group.get(this.model.id).valueChanges
        .pipe(
          filter((value) => this.currentValue !== value)
        ).subscribe((value) => {
          this.setCurrentValue(value);
        })
    );
  }

  /**
   * Handles the user input on the field. It emits a change event and sets the current value with the given value.
   * @param event The value emitted due to user changes.
   */
  public onInput(event): void {
    // If user input is empty, reset the select field.
    if (isEmpty(event.target.value)) {
      this.setCurrentValue(undefined);
      this.dispatchUpdate(undefined);
    } else {
      let newValue = new FormFieldMetadataValueObject(event.target.value);
      this.setCurrentValue(newValue);
      this.dispatchUpdate(newValue);
    }
    // Empty the department field options when the user types in a custom value.
    this.publicationAffiliationFieldUpdateService.triggerFieldUpdateEvent(new AffiliationUpdateData(null, this.model.parent, true));
  }

  /** Converts an item from the result list to a `string` to display in an option field. */
  // Used in the template to render select options.
  inputFormatter = (x: VocabularyEntry): string => x.display || x.value;

  /**
   * Handles the user selection on the field options. It emits a change event and sets the current value with the given value.
   * @param event The value emitted due to user changes.
   */
  public onSelect(event: VocabularyEntry): void {
    this.group.markAsDirty();
    this.selectOption(event);
  }

  /**
   * Selects the given option and sets the current value with the given value.
   * Also triggers an event to update the department field if the selected option has an authority value.
   * @param option The option to select.
   */
  protected selectOption(option: VocabularyEntry): void {
    let newValue = new FormFieldMetadataValueObject(option.value, null, option.securityLevel, option.authority, option.display);
    this.setCurrentValue(newValue);
    this.dispatchUpdate(newValue);

    this.selectAuthorityIfAvailable(option.authority, true);
  }

  /**
   * Sends a message to the department component to update the department select options.
   * If the authority is empty, the department select options are cleared.
   * If the clearDepartmentData flag is set to true, the department field value is also cleared.
   * 
   * @param authority: The uuid of the institution to get the children from.
   * @param clearDepartmentData: A flag to clear the department field value.
   */
  private selectAuthorityIfAvailable(authority: string, clearDepartmentData: boolean): void {
    // Get all child affiliation for a given uuid.
    // In case the user types a new institution, we don't have an authority value and we can't get the children, so we send an empty list.
    if (!isEmpty(authority)) {
      let targetEntity = this.affiliationsList.find((affiliation: AffiliationData) => affiliation.UUID === authority);
      if (targetEntity !== null && targetEntity.children !== null) {
        let affiliationsToSend = this.flattenAndIndexAffiliationData(targetEntity.children);
        this.publicationAffiliationFieldUpdateService.triggerFieldUpdateEvent(new AffiliationUpdateData(affiliationsToSend, this.model.parent, clearDepartmentData));
        return;
      }
    } 
    // Empty the department field select option and, if specified, the value.
    this.publicationAffiliationFieldUpdateService.triggerFieldUpdateEvent(new AffiliationUpdateData(null, this.model.parent, clearDepartmentData));
  }

  /**
   * Converts an option coming from the backend into a VocabularyEntry.
   * @param option The option to generate the VocabularyEntry from.
   * @returns The generated VocabularyEntry.
   */
  protected generateVocabularyEntry(affiliation: AffiliationData): VocabularyEntry {
    return Object.assign(new VocabularyEntry(), {
      display: affiliation.acronym,
      value: affiliation.acronym,
      authority: affiliation.UUID
    });
  }

  /**
   * Generates a flat list of affiliation data to send to the department component.
   * Each affiliation is indexed to keep track of the hierarchy.
   * 
   * @param affiliationData: The affiliation data to flatten.
   * @param targetList: The list to append the flattened data to.
   * @param index: The index of the current affiliation in the hierarchy.
   * @returns A flattened list of affiliation data that can be sent to the department component.
   */
  private flattenAndIndexAffiliationData(affiliationData: AffiliationData[], targetList: AffiliationData[] = [], index = 0): AffiliationData[] {
    affiliationData.forEach((affiliation: AffiliationData) => {
      let newAffiliation = {
        ...affiliation,
        index: index
      };
      targetList.push(newAffiliation);
      if (!isEmpty(affiliation.children)) {
        this.flattenAndIndexAffiliationData(affiliation.children, targetList, index + 1);
      }
    });
    return targetList;
  }
}
