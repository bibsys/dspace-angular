import { ThemedComponent } from 'src/app/shared/theme-support/themed.component';
import { Component, Input } from '@angular/core';
import { SubmissionSectionUploadAccessConditionsComponent } from './submission-section-upload-access-conditions.component';
import { ResourcePolicy } from 'src/app/core/resource-policy/models/resource-policy.model';

/**
 * New Themed version of `SubmissionSectionUploadAccessConditionsComponent`.
 * Used to create a modified version without changing the current html of the component.
 */
@Component({
    selector: 'ds-themed-submission-section-upload-access-conditions',
    templateUrl: '../../../../shared/theme-support/themed.component.html'
})
export class ThemedSubmissionSectionUploadAccessConditionsComponent extends ThemedComponent<SubmissionSectionUploadAccessConditionsComponent>{

    @Input() accessConditions: ResourcePolicy[];

    protected inAndOutputNames: (keyof SubmissionSectionUploadAccessConditionsComponent & keyof this)[] = [
        'accessConditions'
    ];

    protected getComponentName(): string {
        return 'SubmissionSectionUploadAccessConditionsComponent';
    }

    protected importThemedComponent(themeName: string): Promise<any> {
        return import(`../../../../../themes/${themeName}/app/submission/sections/upload/accessConditions/submission-section-upload-access-conditions.component`);
    }

    protected importUnthemedComponent(): Promise<any> {
        return import(`./submission-section-upload-access-conditions.component`);
    }
}
