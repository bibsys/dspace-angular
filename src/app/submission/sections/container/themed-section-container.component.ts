import { ThemedComponent } from 'src/app/shared/theme-support/themed.component';
import { SubmissionSectionContainerComponent } from './section-container.component';
import { Component, Input } from '@angular/core';
import { SectionDataObject } from '../models/section-data.model';

@Component({
    selector: 'ds-themed-submission-section-container',
    templateUrl: '../../../shared/theme-support/themed.component.html'
})
export class ThemedSubmissionSectionContainerComponent extends ThemedComponent<SubmissionSectionContainerComponent> {
    @Input() collectionId: string;

    @Input() entityType: string;

    @Input() sectionData: SectionDataObject;

    @Input() submissionId: string;

    protected inAndOutputNames: (keyof SubmissionSectionContainerComponent & keyof this)[] = [
        'collectionId',
        'entityType',
        'sectionData',
        'submissionId'
    ];

    protected getComponentName(): string {
        return 'SubmissionSectionContainerComponent';
    }

    protected importThemedComponent(themeName: string): Promise<any> {
        return import(`../../../../themes/${themeName}/app/submission/sections/container/section-container.component`);
    }

    protected importUnthemedComponent(): Promise<any> {
        return import(`./section-container.component`);
    }
}
