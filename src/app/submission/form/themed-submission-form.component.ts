import { ThemedComponent } from 'src/app/shared/theme-support/themed.component';
import { SubmissionFormComponent } from './submission-form.component';
import { Component, Input } from '@angular/core';
import { Item } from 'src/app/core/shared/item.model';
import { WorkspaceitemSectionsObject } from 'src/app/core/submission/models/workspaceitem-sections.model';
import { SubmissionError } from '../objects/submission-error.model';
import { SubmissionDefinitionsModel } from 'src/app/core/config/models/config-submission-definitions.model';
import { MetadataSecurityConfiguration } from 'src/app/core/submission/models/metadata-security-configuration';

@Component({
    selector: 'ds-themed-submission-form',
    templateUrl: './../../shared/theme-support/themed.component.html'
})
export class ThemedSubmissionFormComponent extends ThemedComponent<SubmissionFormComponent>{
    @Input() collectionId: string;

    @Input() item: Item;

    @Input() collectionModifiable: boolean | null = null;

    @Input() sections: WorkspaceitemSectionsObject;

    @Input() submissionErrors: SubmissionError;

    @Input() selfUrl: string;

    @Input() submissionDefinition: SubmissionDefinitionsModel;

    @Input() submissionId: string;

    @Input() metadataSecurityConfiguration: MetadataSecurityConfiguration;

    @Input() entityType: string;

    protected inAndOutputNames: (keyof SubmissionFormComponent & keyof this)[] = [
        'collectionId',
        'item',
        'collectionModifiable',
        'sections',
        'submissionErrors',
        'selfUrl',
        'submissionDefinition',
        'submissionId',
        'metadataSecurityConfiguration',
        'entityType'
    ];

    protected getComponentName(): string {
        return 'SubmissionFormComponent';
    }

    protected importThemedComponent(themeName: string): Promise<any> {
        return import(`../../../themes/${themeName}/app/submission/form/submission-form.component`);
    }

    protected importUnthemedComponent(): Promise<any> {
        return import(`./submission-form.component`);
    }
}
