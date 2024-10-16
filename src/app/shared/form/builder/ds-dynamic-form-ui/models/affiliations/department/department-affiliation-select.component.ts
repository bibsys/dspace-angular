import { Component, Input, OnDestroy, OnInit, Pipe, PipeTransform } from "@angular/core";
import { DynamicDepartmentAffiliationSelectModel } from "./department-affiliation-select.model";
import { filter } from "rxjs";
import { isEmpty } from "src/app/shared/empty.util";
import { AffiliationData, PublicationAffiliationDataService } from "src/app/core/data/publication-affiliation-data.service";
import { FormFieldMetadataValueObject } from "../../../../models/form-field-metadata-value.model";
import { AffiliationSelectComponent } from "../affiliation-select.component";
import { AffiliationUpdateData, FormAffiliationFieldUpdateService } from "src/app/core/data/publication-affiliation-field-update.service";
import { DynamicFormLayoutService, DynamicFormValidationService } from "@ng-dynamic-forms/core";
import { NotificationsService } from "src/app/shared/notifications/notifications.service";
import { AffiliationDisplayFormatPipe } from "src/app/shared/form/pipes/affiliation-display-format.pipe";
import { AffiliationPaddingRenderingPipe } from "src/app/shared/form/pipes/affiliation-padding-rendering.pipe";

/**
 *  1. Display empty select first with no selectable option.
 *  2. When an event is fired on the 'affiliationFieldUpdateEvent' extract the optionList from it and load the recursive template.
 *  Each time an event is fired and handled, the select && the value behind it should be emptied based on the 'clearData' flag.
 * 
 * @Author: Michaël Pourbaix <michael.pourbaix@uclouvain.be>
 */
@Component({
  selector: 'ds-department-affiliation-select',
  styleUrls: ['./department-affiliation-select.component.scss'],
  templateUrl: './department-affiliation-select.component.html'
})
export class DsDynamicDepartmentAffiliationComponent extends AffiliationSelectComponent implements OnInit, OnDestroy {
  
  @Input() model: DynamicDepartmentAffiliationSelectModel;

  // Global affiliations are static and reloaded only when the user changes the institution.
  public affiliations: AffiliationData[];
  // Displayed affiliations are filtered based on the user input.
  public searchResult: AffiliationData[];

  // protected displayFormatPipe = new affiliationDisplayFormatPipe;
  // protected paddingRenderingPipe = new affiliationPaddingRenderingPipe;

  public selectMode = true;

  private separator = ' - ';

  constructor(
    protected layoutService: DynamicFormLayoutService,
    protected validationService: DynamicFormValidationService,
    protected publicationAffiliationDataService: PublicationAffiliationDataService,
    protected publicationAffiliationFieldUpdateService: FormAffiliationFieldUpdateService,
    protected notificationsService: NotificationsService,
    protected affiliationDisplayFormatPipe: AffiliationDisplayFormatPipe,
    protected affiliationPaddingRenderingPipe: AffiliationPaddingRenderingPipe
  ) {
    super(layoutService, validationService, publicationAffiliationDataService, publicationAffiliationFieldUpdateService, notificationsService);
  }

  public ngOnInit(): void {
    if (this.model.value) {
      this.setCurrentValue(this.model.value);
    }

    this.subscriptions.push(
      // Watch the Subject for any changes.
      this.publicationAffiliationFieldUpdateService.affiliationFieldUpdateEvent.subscribe(
        (affiliationDetails: AffiliationUpdateData) => {
          // This ensures that the data received is for the current department select component.
          if (!isEmpty(affiliationDetails) && affiliationDetails.parent === this.model.parent) {
            this.triggerDepartmentUpdate(affiliationDetails.data, affiliationDetails.clearData);
          }
        }
      ),
      // Subscription to watch for changes in the form group && update the current value.
      this.group.get(this.model.id).valueChanges
        .pipe(
          filter((value) => this.currentValue !== value)
        )
        .subscribe((value) => this.setCurrentValue(value))
    );
  }

  /**
   * Refresh the optionList with a given list of new options.
   * Also, clear the current value if the clearData flag is set to true.
   * 
   * @param newValue: The new list of options to display.
   * @param clearData: A flag to clear current value.
   */
  triggerDepartmentUpdate(newValue: AffiliationData[], clearData: boolean): void {
    if (clearData) this.emptySelect();

    this.selectMode = !isEmpty(newValue);
    this.affiliations = newValue || [];
    this.searchResult = this.affiliations;
  }

  /**
   * Emits a change event and set the current value with the given value.
   * @param event The value to emit.
   */
  onSelect(event: AffiliationData) {
    this.group.markAsDirty();
    this.selectOption(event);
  }

  /**
   * Handles the user input on the field. It emits a change event and sets the current value with the given value.
   * @param event The value emitted due to user changes.
   */
  public onInput(event): void {
    // If user input is empty, reset the select field.
    if (isEmpty(event.target.value)) {
      // Empty model value
      this.emptySelect();
      // Reset search results
      this.searchResult = this.affiliations;
      return;
    }
    let newValue = new FormFieldMetadataValueObject(event.target.value);
    this.setCurrentValue(newValue);
    this.dispatchUpdate(newValue);
    this.updateSearch();
  }

  /**
   * Updates the search result based on the user input.
   */
  private updateSearch(): void {
    this.currentValue.subscribe((value) => {
      if (value?.value) {
        this.searchResult = this.affiliations.filter(
          (affiliation: AffiliationData) => this.affiliationDisplayFormatPipe.transform(affiliation, this.separator).toLowerCase().includes(value.value.toLowerCase())
        );
      } else {
        this.searchResult = this.affiliations;
      }
    });
  }

  /**
   * Selects the option chosen by the user and sets the current value.
   * @param option: The selected option.
   */
  protected selectOption(option: AffiliationData) {
    let newValue = new FormFieldMetadataValueObject(option.name, null, null, option.UUID, option.name);
    this.setCurrentValue(newValue);
    this.dispatchUpdate(newValue);
    // Reset search results
    this.searchResult = this.affiliations;
  }

  /**
   * Empties the select field by resetting its current value.
   */
  protected emptySelect() {
    this.setCurrentValue(undefined);
    this.dispatchUpdate(undefined);
  }
}
