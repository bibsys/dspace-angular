import { OnInit, Input, Component, Output, EventEmitter } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { DynamicFormControlComponent, DynamicFormLayoutService, DynamicFormValidationService } from '@ng-dynamic-forms/core';
import { DynamicDsYearPickerModel } from './year-picker.model';
import { isUndefined } from 'src/app/shared/empty.util';
import { environment } from 'src/environments/environment';

/**
 * A form field component representing a year.
 * It is linked to the 'year' field-type.
 */
@Component({
    selector: 'ds-year-picker',
    templateUrl: './year-picker.component.html',
    styles: ['legend { font-size: initial; }'],
})
export class DsYearPickerComponent extends DynamicFormControlComponent implements OnInit {
    @Input() bindId = true;
    @Input() group: UntypedFormGroup;
    @Input() model: DynamicDsYearPickerModel;
    @Input() legend: string;

    @Output() selected = new EventEmitter<number>();
    @Output() remove = new EventEmitter<number>();
    @Output() blur = new EventEmitter<any>();
    @Output() change = new EventEmitter<any>();
    @Output() focus = new EventEmitter<any>();

    initialYear: number;

    year: number;
    maxYear: number;
    minYear = 0;

    yearPlaceholder = 'year';

    constructor(protected layoutService: DynamicFormLayoutService,
        protected validationService: DynamicFormValidationService,
    ) {
        super(layoutService, validationService);
    }

    ngOnInit(): void {
        const now = new Date();
        this.initialYear = now.getFullYear();
        if (this.model && this.model.value !== null && this.isYearValid(this.model.value.toString())) {
            const value = this.model.value.toString();
            this.initialYear = parseInt(value, 10);
            this.year = this.initialYear;
        }
        this.maxYear = now.getUTCFullYear() + (environment.form.fields.year.maxYearDelta);
        this.minYear = now.getUTCFullYear() - (environment.form.fields.year.minYearDelta);
    }

    onBlur($event: any): void {
        this.blur.emit();
    }

    onChange(event: any): void {
        if (this.isYearValid(event.value)){
            this.year = event.value;
            this.model.value = event.value;
            this.change.emit(event.value);
        }
    }

    /**
     * Little method to check if a year is valid.
     * The year is check here has a string. If the method returns true, we are sure that it will be convertible to a number.
     * This method is used to deal with the incoming data from the backend.
     *
     * @param year: The year to check.
     * @return: True if the year is defined and does not contain letters. false if not.
     */
    isYearValid(year: string) {
        // 1XXX to 20XX are valid
        let isValidData = /^(1[\d]{3}|20[\d]{2})$/.test(year);
        return !isUndefined(year) && isValidData;
    }
}
