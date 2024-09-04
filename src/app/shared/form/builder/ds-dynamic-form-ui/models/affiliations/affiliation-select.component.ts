import { OnDestroy, EventEmitter, Input, Output, Component } from "@angular/core";
import { DynamicFormControlComponent, DynamicFormLayoutService, DynamicFormValidationService } from "@ng-dynamic-forms/core";
import { DsDynamicInputModel } from "../ds-dynamic-input.model";
import { UntypedFormGroup } from "@angular/forms";
import { Observable, Subscription, of as observableOf } from "rxjs";
import { PublicationAffiliationDataService } from "src/app/core/data/publication-affiliation-data.service";
import { FormAffiliationFieldUpdateService } from "src/app/core/data/publication-affiliation-field-update.service";
import { NgbDropdown } from "@ng-bootstrap/ng-bootstrap";
import { isEmpty } from "src/app/shared/empty.util";
import { FormFieldMetadataValueObject } from "../../../models/form-field-metadata-value.model";
import { VocabularyEntry } from "src/app/core/submission/vocabularies/models/vocabulary-entry.model";
import { NotificationsService } from "src/app/shared/notifications/notifications.service";

/**
 * Abstract class for all affiliation select components.
 * This class provides the common methods and properties.
 * 
 * @Author: Michaël Pourbaix <michael.pourbaix@uclouvain.be>
 */
@Component({
    template: ''
})
export abstract class AffiliationSelectComponent extends DynamicFormControlComponent implements OnDestroy {
    @Input() bindId = true;
    @Input() group: UntypedFormGroup;
    @Input() model: DsDynamicInputModel;
  
    @Output() blur: EventEmitter<any> = new EventEmitter<any>();
    @Output() change: EventEmitter<any> = new EventEmitter<any>();
    @Output() focus: EventEmitter<any> = new EventEmitter<any>();

    protected currentValue: Observable<any>;
    protected subscriptions : Subscription[] = [];

    constructor(
        protected layoutService: DynamicFormLayoutService,
        protected validationService: DynamicFormValidationService,
        protected publicationAffiliationDataService: PublicationAffiliationDataService,
        protected publicationAffiliationFieldUpdateService: FormAffiliationFieldUpdateService,
        protected notificationsService: NotificationsService
    ) {
        super(layoutService, validationService);
    }

    /** OnDestroy hook */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this.subscriptions.forEach(sub => sub.unsubscribe());
    }

    /**
     * Opens the dropdown of the select field.
     * Needs to be bound to the click event of the dropdown button.
     * @param sdRef 
     */
    openDropdown(sdRef: NgbDropdown): void {
        if (!this.model.readOnly) {
            sdRef.open();
        }
    }

    /**
     * KeyDown handler to allow toggling the dropdown via keyboard.
     * @param event KeyboardEvent
     * @param sdRef The reference of the NgbDropdown.
     */
    selectOnKeyDown(event: KeyboardEvent, sdRef: NgbDropdown) {
        const keyName = event.key;
        if (keyName === 'Enter') {
            event.preventDefault();
            event.stopPropagation();
            sdRef.toggle();
        } else if (keyName === 'ArrowDown' || keyName === 'ArrowUp') {
            this.openDropdown(sdRef);
        }
    }

    /**
     * Dispatches a change event for the modification of the model.
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
    protected setCurrentValue(value: any): void {
        if (isEmpty(value)){
          this.currentValue = observableOf(new FormFieldMetadataValueObject());
    
        } else if (typeof value === 'string'){
            let newValue = new FormFieldMetadataValueObject(value);
            this.currentValue = observableOf(newValue);
    
        } else if (value instanceof VocabularyEntry) {
            let newValue = new FormFieldMetadataValueObject(value.value, null, value.securityLevel, value.authority, value.display);
            this.currentValue = observableOf(newValue);
    
        } else if (value instanceof FormFieldMetadataValueObject) {
            this.currentValue = observableOf(value);
        }
      }

}