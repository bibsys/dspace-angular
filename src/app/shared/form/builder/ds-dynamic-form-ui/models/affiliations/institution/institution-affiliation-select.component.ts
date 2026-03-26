import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { filter } from "rxjs";
import { AffiliationData } from "src/app/core/data/publication-affiliation-data.service";
import { AffiliationUpdateData } from "src/app/core/data/publication-affiliation-field-update.service";
import { VocabularyEntry } from "src/app/core/submission/vocabularies/models/vocabulary-entry.model";
import { isEmpty } from "src/app/shared/empty.util";
import { FormFieldMetadataValueObject } from "../../../../models/form-field-metadata-value.model";
import { AffiliationSelectComponent } from "../affiliation-select.component";
import { DynamicInstitutionAffiliationSelectModel } from "./institution-affiliation-select.model";


/**
 * Main institution component used to display all the root institutions in a select field.
 * When the component is initialized, it fetches the affiliation tree from the backend and displays as select field options containing the root elements.
 * When the user clicks on an option, the component processes its children and sends them to the department component via an Subject event.
 * The user can also type in whatever value he wants. In this case the component sends an empty list to the department component.
 *
 * @author Michaël Pourbaix <michael.pourbaix@uclouvain.be>
 */
@Component({
  selector: 'ds-institution-affiliation-select',
  styleUrls: ['./institution-affiliation-select.component.scss', '../../scrollable-dropdown/dynamic-scrollable-dropdown.component.scss'],
  templateUrl: './institution-affiliation-select.component.html',
  imports: [
    NgbDropdownModule,
    NgIf,
    AsyncPipe,
    TranslateModule,
    NgForOf
  ],
  standalone: true
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
    this.subscriptions.push(// Fetch the root affiliations to display them in the select options.
      this.publicationAffiliationDataService.getAffiliationsTree().subscribe((affiliations: any) => {
        if (!isEmpty(affiliations)) {
          this.affiliationsList = affiliations;
          this.optionsList = this.affiliationsList
            .map((affiliation: AffiliationData) => this.generateVocabularyEntry(affiliation))
            .filter(affiliation => !this.model.excludedValues.has(affiliation.value));
          if (!isEmpty(modelValue) && !isEmpty(modelValue.authority)) {
            // If we have a model value we can check if it is in the options list and select it.
            this.selectAuthorityIfAvailable(modelValue.authority, false);
          }
        }
      }), // Subscription to watch for changes in the form group && update the current value.
      this.group.get(this.model.id).valueChanges
        .pipe(filter((value) => this.currentValue !== value)).subscribe((value) => {
        this.setCurrentValue(value);
      }));
  }

  /**
   * Handles the user input on the field. It emits a change event and sets the current value with the given value.
   * @param event The value emitted due to user changes.
   */
  public onInput(event: any): void {
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
   *
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
   * Converts an option coming from the backend into a VocabularyEntry.
   * @param affiliation The chose option to use to generate the VocabularyEntry from.
   * @returns The generated VocabularyEntry.
   */
  protected generateVocabularyEntry(affiliation: AffiliationData): VocabularyEntry {
    return Object.assign(new VocabularyEntry(), {
      display: affiliation?.displayAcronym ?? affiliation.acronym,
      value: affiliation.acronym,
      authority: affiliation.uuid
    });
  }

  /**
   * Sends a message to the department component to update the department select options.
   * If the authority is empty, the department select options are cleared.
   * If the clearDepartmentData flag is set to true, the department field value is also cleared.
   *
   * @param authority The uuid of the institution to get the children from.
   * @param clearDepartmentData A flag to clear the department field value.
   */
  private selectAuthorityIfAvailable(authority: string, clearDepartmentData: boolean): void {
    // Get all child affiliation for a given uuid.
    // In case the user types a new institution, we don't have an authority value, and we can't get the children, so we send an empty list.
    if (!isEmpty(authority)) {
      let targetEntity = this.affiliationsList.find((affiliation: AffiliationData) => affiliation.uuid === authority);
      if (!isEmpty(targetEntity?.children)) {
        let affiliationsToSend = this.flattenAndIndexAffiliationData(targetEntity.children);
        this.publicationAffiliationFieldUpdateService.triggerFieldUpdateEvent(new AffiliationUpdateData(affiliationsToSend, this.model.parent, clearDepartmentData));
        return;
      }
    }
    // Empty the department field select option and, if specified, the value.
    this.publicationAffiliationFieldUpdateService.triggerFieldUpdateEvent(new AffiliationUpdateData(null, this.model.parent, clearDepartmentData));
  }

  /**
   * Generates a flat list of affiliation data to send to the department component.
   * A sorting is applied before flattening on the weight or the name (alphabetical order).
   * Each affiliation is indexed to keep track of the hierarchy.
   *
   * @param affiliationData The affiliation data to flatten.
   * @param targetList The list to append the flattened data to.
   * @param index The index of the current affiliation in the hierarchy.
   * @returns A flattened list of affiliation data that can be sent to the department component.
   */
  private flattenAndIndexAffiliationData(affiliationData: AffiliationData[], targetList: AffiliationData[] = [], index = 0): AffiliationData[] {
    [...affiliationData].sort((a, b) => this.sortAffiliations(a, b)).forEach((affiliation: AffiliationData) => {
      let newAffiliation = {
        ...affiliation, index: index
      };
      targetList.push(newAffiliation);
      if (!isEmpty(affiliation.children)) {
        this.flattenAndIndexAffiliationData(affiliation.children, targetList, index + 1);
      }
    });
    return targetList;
  }

  /**
   * Sort an affiliation by its weight and if necessary by its name.
   * 
   * @param affiliationA The first affiliation candidate for sorting.
   * @param affiliationB The second affiliation candidate for sorting.
   * @returns 1, -1 or 0 depending on which candidate wins.
   */
  private sortAffiliations(affiliationA: AffiliationData, affiliationB: AffiliationData): number {
    let sorted = this.sortByWeight(affiliationA, affiliationB);
    if (sorted === 0) {
      sorted = this.sortByLabel(affiliationA, affiliationB);
    }
    return sorted;
  }

  /**
   * Sort affiliations by weight. The higher the weight the lower you should be in the list.
   * 
   * @param a The first affiliation candidate for sorting.
   * @param b The second affiliation candidate for sorting.
   * @returns 1 or -1 depending on which candidate has the best weight.
   */
  private sortByWeight(a: AffiliationData, b: AffiliationData): number {
    const aWeight = a.weight ?? 50;
    const bWeight = b.weight ?? 50;
    return bWeight - aWeight;
  }

  /**
   * Sort affiliations by name. If an affiliation has no acronym use the name.
   * The affiliation are sorted alphabetically.
   * 
   * @param a The first affiliation candidate for sorting.
   * @param b The second affiliation candidate for sorting.
   * @returns 1, -1 or 0 depending on which candidate wins.
   */
  private sortByLabel(a: AffiliationData, b: AffiliationData): number {
    const aLowerCase = a.acronym ? a.acronym.toLowerCase(): a.name.toLowerCase();
    const bLowerCase = b.acronym ? b.acronym.toLowerCase(): b.name.toLowerCase();

    if (aLowerCase > bLowerCase) { return 1 }
    if (aLowerCase < bLowerCase) { return -1 }
    return 0
  }
}
