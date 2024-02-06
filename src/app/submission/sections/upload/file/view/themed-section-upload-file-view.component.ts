import { ThemedComponent } from 'src/app/shared/theme-support/themed.component';
import { SubmissionSectionUploadFileViewComponent } from './section-upload-file-view.component';
import { Component, Input } from '@angular/core';
import { WorkspaceitemSectionUploadFileObject } from 'src/app/core/submission/models/workspaceitem-section-upload-file.model';

/**
 * New Themed version of `SubmissionSectionUploadFileViewComponent`.
 * Used to create a modified version without changing the current html of the component.
 */
@Component({
    selector: 'ds-themed-submission-section-upload-file-view',
    templateUrl: '../../../../../shared/theme-support/themed.component.html'
})
export class ThemedSubmissionSectionUploadFileViewComponent extends ThemedComponent<SubmissionSectionUploadFileViewComponent>{

    @Input() fileData: WorkspaceitemSectionUploadFileObject;

    protected inAndOutputNames: (keyof SubmissionSectionUploadFileViewComponent & keyof this)[] = [
        'fileData'
    ];

    protected getComponentName(): string {
        return 'SubmissionSectionUploadFileViewComponent';
    }

    protected importThemedComponent(themeName: string): Promise<any> {
        return import(`../../../../../../themes/${themeName}/app/submission/sections/upload/file/view/section-upload-file-view.component`);
    }

    protected importUnthemedComponent(): Promise<any> {
        return import(`./section-upload-file-view.component`);
    }
}
