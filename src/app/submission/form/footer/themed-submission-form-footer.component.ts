import { ThemedComponent } from 'src/app/shared/theme-support/themed.component';
import { SubmissionFormFooterComponent } from './submission-form-footer.component';
import { Component, Input } from '@angular/core';

@Component({
    selector: 'ds-themed-submission-form-footer',
    templateUrl: './../../../shared/theme-support/themed.component.html'
})
export class ThemedSubmissionFormFooterComponent extends ThemedComponent<SubmissionFormFooterComponent>{

    @Input() submissionId: string;

    protected inAndOutputNames: (keyof SubmissionFormFooterComponent & keyof this)[] = [
        'submissionId'
    ];

    protected getComponentName(): string {
        return 'SubmissionFormFooterComponent';
    }

    protected importThemedComponent(themeName: string): Promise<any> {
        return import(`../../../../themes/${themeName}/app/submission/form/footer/submission-form-footer.component`);
    }

    protected importUnthemedComponent(): Promise<any> {
        return import(`./submission-form-footer.component`);
    }
}
