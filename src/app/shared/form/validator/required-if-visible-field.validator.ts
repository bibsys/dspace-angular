import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
import { DynamicInputModel } from "@ng-dynamic-forms/core";
import { isEmpty } from "../../empty.util";

/**
 * Custom validator for required field which ignores hidden fields.
 * This is used to prevent the case where a form cannot be published because a field is required && hidden.
 * @param model The model to check for visibility and requirement.
 * @returns Un object meaning that the field is required or null if it is not.
 * 
 * @author Michaël Pourbaix <michael.pourbaix@uclouvain.be>
 */
export function requiredIfVisibleValidator(model: DynamicInputModel): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        if (!model.hidden && model.required) {
            // If field value is empty toggle the required flag.
            return isEmpty(control.value) ? {required: true}: null;
        }
        return null;
    }
}