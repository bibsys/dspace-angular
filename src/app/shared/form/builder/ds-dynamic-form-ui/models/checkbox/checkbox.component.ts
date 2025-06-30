import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from "@angular/core";
import { UntypedFormGroup } from "@angular/forms";
import { DynamicFormControlComponent, DynamicFormLayoutService, DynamicFormValidationService } from "@ng-dynamic-forms/core";
import { DynamicDsCheckboxModel } from "./checkbox.model";
import { hasValue, isEmpty } from "src/app/shared/empty.util";
import { NgClass, NgIf } from "@angular/common";
import { Subscription } from "rxjs";
import { FormFieldMetadataValueObject } from "../../../models/form-field-metadata-value.model";

/**
 * Simple custom checkbox component to use in the dynamic form builder. Compared to {@link DynamicNGBootstrapCheckboxComponent}, it can be used in the submission form definition.
 * 
 * When the field is first loaded, it sets the default model value to false.
 * This is done to always have a value in the model, even if the user has not interacted with the checkbox yet.
 * 
 * @Author: Michaël Pourbaix <michael.pourbaix@uclouvain.be>
 */
@Component({
    selector: 'ds-checkbox',
    templateUrl: './checkbox.component.html',
    styles: ['legend {font-size: initial;} input, label {cursor: pointer;}'],
    imports: [NgIf, NgClass],
    standalone: true,
})
export class CustomCheckboxComponent extends DynamicFormControlComponent implements OnInit, OnDestroy {
    @Input() bindId = true;
    @Input() group: UntypedFormGroup;
    @Input() model: DynamicDsCheckboxModel;

    @Output() blur = new EventEmitter<any>();
    @Output() change = new EventEmitter<any>();
    @Output() focus = new EventEmitter<any>();

    protected isEmpty = isEmpty;
    private subs: Subscription[] = [];

    constructor(protected layoutService: DynamicFormLayoutService,
        protected validationService: DynamicFormValidationService,
    ) {
        super(layoutService, validationService);
    }

    ngOnInit(): void {
        let currentValue = this.model.value;
        if (currentValue && (typeof currentValue === 'string') && (['true', 'false'].includes(currentValue.toString()))) {
            this.model.checked = this.stringToBoolean(currentValue);
        } else {
            this.model.value = 'false';
            this.change.emit(this.model.value);
        }

        this.subs.push(
            // Listen for changes on the model value.
            // This is useful for autocomplete scenario (authority based).
            this.model.valueChanges.subscribe((value) => {
                let modelValue: any = this.model.value;
                if (this.model.value instanceof FormFieldMetadataValueObject) {
                    modelValue = (modelValue as FormFieldMetadataValueObject).value;
                }
                this.model.checked = this.stringToBoolean(modelValue);
            })
        );
    }

    onChange(event): void {
        this.toggleCheckbox();
    }

    public toggleCheckbox(): void {
        let newValue = !this.model.checked;
        this.model.checked = newValue;

        this.model.value = newValue.toString();
        this.change.emit(this.model.value);
    }

    stringToBoolean(value: string): boolean {
        return value.toLowerCase() === 'true';
    }

    ngOnDestroy(): void {
        this.subs.filter(sub => hasValue(sub)).forEach(sub => sub.unsubscribe());
    }
}