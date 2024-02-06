import { ThemedComponent } from 'src/app/shared/theme-support/themed.component';
import { SubmissionSectionUploadComponent } from './section-upload.component';
import { Component } from '@angular/core';
import { renderSectionFor } from '../sections-decorator';
import { SectionsType } from '../sections-type';

/**
 * New Themed version of `SubmissionSectionUploadComponent`.
 * Used to create a modified version without changing the current html of the component.
 */
@Component({
    selector: 'ds-themed-submission-section-upload',
    templateUrl: '../../../shared/theme-support/themed.component.html'
})
// Used to render this component for the 'upload' section
@renderSectionFor(SectionsType.Upload)
export class ThemedSubmissionSectionUploadComponent extends ThemedComponent<SubmissionSectionUploadComponent> {

    protected inAndOutputNames: (keyof SubmissionSectionUploadComponent & keyof this)[] = [];

    protected getComponentName(): string {
        return 'SubmissionSectionUploadComponent';
    }

    protected importThemedComponent(themeName: string): Promise<any> {
        return import(`../../../../themes/${themeName}/app/submission/sections/upload/section-upload.component`);
    }

    protected importUnthemedComponent(): Promise<any> {
        return import(`./section-upload.component`);
    }
}
