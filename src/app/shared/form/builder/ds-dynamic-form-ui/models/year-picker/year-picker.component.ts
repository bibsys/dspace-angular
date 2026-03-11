import { OnInit, Input, Component, Output, EventEmitter } from '@angular/core';
import { FormsModule, UntypedFormGroup } from '@angular/forms';
import { DynamicFormControlComponent, DynamicFormLayoutService, DynamicFormValidationService } from '@ng-dynamic-forms/core';
import { DynamicDsYearPickerModel } from './year-picker.model';
import { isUndefined, isNotEmpty } from 'src/app/shared/empty.util';
import { NgClass, NgIf } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { NumberPickerComponent } from 'src/app/shared/form/number-picker/number-picker.component';

/**
 * A form field component representing a year.
 * It is linked to the 'year' field-type.
 */
@Component({
    selector: 'ds-year-picker',
    templateUrl: './year-picker.component.html',
    styles: ['legend { font-size: 1rem; }'],
    imports: [NgIf, NgClass, TranslateModule, NumberPickerComponent, FormsModule],
    standalone: true,
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
    maxYear: number;
    minYear: number;
    yearPlaceholder: string = 'year';
    valueToDisplay: number;

    constructor(protected layoutService: DynamicFormLayoutService,
      protected validationService: DynamicFormValidationService,
    ) {
      super(layoutService, validationService);
    }

    ngOnInit(): void {
      const currentYear: number = new Date().getFullYear();
      // If a year exists in the model use it has the year value.
      if (this.model.value !== null && this.isYearValid(this.model.value.toString())) {
        this.setModelValue(parseInt(this.model.value.toString(), 10));
      // Else if no value found, see if we should use the current year.
      } else if (this.model.useCurrentYear) {
        this.setModelValue(currentYear);
      }

      this.processMaxYear(currentYear);
      this.processMinYear(currentYear);
    }

    /**
     * Set the max year: 
     *  - If a delta is present, use it to process the max year based on the current year.
     *  - If a delta is not present but a maxYear is present in config, use it.
     *  - If nor delta or maxYear present, use default value.
     * 
     * @param currentYear The current year as number used to process the max year.
     */
    processMaxYear(currentYear: number): void {
      this.maxYear = isNotEmpty(this.model.maxYearDelta) 
        ? (currentYear + this.model.maxYearDelta)
        : (isNotEmpty(this.model.maxYear) ? this.model.maxYear : 2199);
    }

    /**
     * Set the min year: 
     *  - If a delta is present, use it to process the min year based on the current year.
     *  - If a delta is not present but a minYear is present in config, use it.
     *  - If nor delta or minYear present, use default value.
     * 
     * @param currentYear The current year as number used to process the min year.
     */
    processMinYear(currentYear: number): void {
      this.minYear = isNotEmpty(this.model.minYearDelta) 
        ? (currentYear - this.model.minYearDelta)
        : (isNotEmpty(this.model.minYear) ? this.model.minYear : 1000);
    }

    /** 
     * Sets the model value to the given number
     * 
     * @param value The value to set the model to.
     */
    setModelValue(value: number | string): void {
      this.model.value = ''+value;
      this.change.emit(this.model.value);
      this.valueToDisplay = parseInt(this.model.value);
    }

    emptyField(): void {
      if (isNotEmpty(this.model.value)) {
        this.model.value = '';
        this.change.emit('');
        this.valueToDisplay = undefined;
      }
    }

    onBlur($event: any): void {
      this.blur.emit();
    }

    onChange(event: any): void {
      if (this.isYearValid(event.value)){
        this.setModelValue(event.value);
      } else {
        this.emptyField()
      }
    }

    /**
     * Little method to check if a year is valid.
     * The year is checked here has a string. If the method returns true, we are sure that it will be convertible to a
     * number. This method is used to deal with the incoming data from the backend.
     * @param year The year to check.
     * @return True if the year is defined and does not contain letters. False if not.
     */
    isYearValid(year: string) {
      // 1XXX to 21XX are valid
      let isValidData = /^(1[\d]{3}|2[0-1][\d]{2})$/.test(year);
      return !isUndefined(year) && isValidData;
    }
}