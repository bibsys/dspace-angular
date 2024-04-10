import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { DynamicSelectModel } from './dynamic-empty-select.model';
import { DynamicFormControlComponent, DynamicFormLayoutService, DynamicFormValidationService } from '@ng-dynamic-forms/core';
import { UntypedFormGroup } from '@angular/forms';
import { VocabularyEntry } from 'src/app/core/submission/vocabularies/models/vocabulary-entry.model';
import { NgbDropdown } from '@ng-bootstrap/ng-bootstrap';
import { FormDynamicUpdateService } from 'src/app/shared/form/dynamic-fields/form.dynamic-update.service';
import { Observable, Subscription, of as observableOf } from 'rxjs';
import { replaceAll } from 'src/app/shared/form/dynamic-fields/string.util';
import { isEmpty } from 'src/app/shared/empty.util';


/**
 * Basic empty select field. Can be used to be filled up with future data.
 * Useful for the dynamic fields functionality with author creation/edition.
 *
 * @author michael.pourbaix@uclouvain.be
 */
@Component({
    selector: 'ds-dynamic-empty-select',
    templateUrl: './dynamic-empty-select.component.html',
    styleUrls: ['./dynamic-empty-select.component.scss']
})
export class DsDynamicEmptySelectComponent extends DynamicFormControlComponent implements OnInit, OnDestroy {

  // COMPONENTS ATTRIBUTES ====================================================
  @Input() bindId = true;
  @Input() group: UntypedFormGroup;
  @Input() model: DynamicSelectModel;

  @Output() blur: EventEmitter<any> = new EventEmitter<any>();
  @Output() change: EventEmitter<any> = new EventEmitter<any>();
  @Output() focus: EventEmitter<any> = new EventEmitter<any>();

  public currentValue: Observable<any>;
  public optionsList: VocabularyEntry[] = [];

	private subscriptions = new Subscription();

  // CONSTRUCTOR & HOOKS ======================================================
  /**
   * Constructor
   * @param {DynamicFormLayoutService} layoutService
   * @param {DynamicFormValidationService} validationService
   * @param {FormDynamicUpdateService} formDynamicUpdateService
   */
  constructor(
    protected layoutService: DynamicFormLayoutService,
    protected validationService: DynamicFormValidationService,
    protected formDynamicUpdateService: FormDynamicUpdateService
  ) {
    super(layoutService, validationService);
  }

  /** OnInit hook */
  ngOnInit(){
    if (this.model.value) {
      let modelValue = this.model.value.toString();
      this.setCurrentValue(modelValue);
      this.optionsList = [this.generateVocabularyEntry({value: modelValue, displayed: modelValue})];
    }
    this.subscriptions.add(
      this.formDynamicUpdateService.dynamicFieldUpdateEvent
        .subscribe((data: any) => {
          let relevantData = data['data-' + replaceAll(this.model.id, '_', '.')];
          // If there is relevant data for the current field
          if (relevantData) {
            // Update value if given
            if (relevantData.value) {
              let remoteValue = this.generateVocabularyEntry(relevantData.value);
              this.selectOption(remoteValue);
            }
            // Update options
            //   * Retrieve the "options" key from the "relevantData" object
            //   * If only one option is possible, select it
            this.optionsList = relevantData.options.map((o) => this.generateVocabularyEntry(o));
            if (this.optionsList.length == 1) {
              this.selectOption(this.optionsList[0]);
            }
          }
        })
    );
  }

  /** OnDestroy hook */
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  // PUBLIC COMPONENT METHODS =================================================
  /** Converts an item from the result list to a `string` to display in the `<input>` field. */
  inputFormatter = (x: VocabularyEntry): string => x.display || x.value;

  /**
   * Opens dropdown menu
   * @param sdRef The reference of the NgbDropdown.
   */
  openDropdown(sdRef: NgbDropdown) {
    if (!this.model.readOnly) {
      sdRef.open();
    }
  }

  /**
   * KeyDown handler to allow toggling the dropdown via keyboard
   * @param event KeyboardEvent
   * @param sdRef The reference of the NgbDropdown.
   */
  selectOnKeyDown(event: KeyboardEvent, sdRef: NgbDropdown) {
    const keyName = event.key;
    if (keyName === ' ' || keyName === 'Enter') {
      event.preventDefault();
      event.stopPropagation();
      sdRef.toggle();
    } else if (keyName === 'ArrowDown' || keyName === 'ArrowUp') {
      this.openDropdown(sdRef);
    }
  }

  /**
   * Emits a change event and set the current value with the given value.
   * @param event The value to emit.
   */
  onSelect(event: VocabularyEntry) {
    this.group.markAsDirty();
    this.selectOption(event);
  }

  //PRIVATE COMPONENT METHODS =================================================
  protected selectOption(option: VocabularyEntry) {
    this.setCurrentValue(option);
    this.dispatchUpdate(option.value);
  }

  /**
   * Converts an option coming from the backend into a VocabularyEntry.
   * @param option The option to generate the VocabularyEntry from.
   * @returns The generated VocabularyEntry.
   */
  protected generateVocabularyEntry(option: {value: string, displayed: string}): VocabularyEntry {
    return Object.assign(new VocabularyEntry(), {
      display: option?.displayed || option.value,
      value: option.value
    });
  }

  /**
   * Dispatches the change event.
   * @param value The value to emit.
   */
  protected dispatchUpdate(value: any): void {
    this.model.value = value;
    this.change.emit(value);
  }

  /**
   * Set the current value with the given value as an observable.
   * @param value The value to set.
   */
  protected setCurrentValue(value: any) {
    if (isEmpty(value)){
      this.currentValue = observableOf('');
    } else if (typeof value === 'string'){
      this.currentValue = observableOf(value);
    } else if (value instanceof VocabularyEntry) {
      this.currentValue = observableOf(value.display || value.value);
    }
  }
}
