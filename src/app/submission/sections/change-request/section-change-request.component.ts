import { Observable, of } from "rxjs";
import { SectionModelComponent } from "../models/section.model";
import { SectionDataObject } from "../models/section-data.model";
import { SectionsService } from "../sections.service";
import { Component, Inject } from "@angular/core";
import { WorkspaceItemSectionChangeRequestObject } from "src/app/core/submission/models/workspaceitem-section-change-request.model";
import { TranslateModule } from "@ngx-translate/core";

/**
 * Section component to render a change request.
 * This allows the submitter to read the feedback of the manager and adapt his submission accordingly.
 */
@Component({
    selector: 'ds-submission-section-change-request',
    templateUrl: './section-change-request.component.html',
    styleUrls: ['./section-change-request.component.scss'],
    imports: [
        TranslateModule
    ],
    standalone: true,
})
export class SubmissionSectionChangeRequestComponent extends SectionModelComponent {

    changeRequestData: WorkspaceItemSectionChangeRequestObject; 

    /**
    * Initialize instance variables
    *
    * @param {SectionsService} sectionService
    * @param {string} injectedCollectionId
    * @param {SectionDataObject} injectedSectionData
    * @param {string} injectedSubmissionId
    */
    constructor(
      protected sectionService: SectionsService,
      @Inject('collectionIdProvider') public injectedCollectionId: string,
      @Inject('sectionDataProvider') public injectedSectionData: SectionDataObject,
      @Inject('submissionIdProvider') public injectedSubmissionId: string
    ) {
        super(injectedCollectionId, injectedSectionData, injectedSubmissionId);
    }


    protected getSectionStatus(): Observable<boolean> {
        return of(true);
    }

    protected onSectionInit(): void {
        this.changeRequestData = this.sectionData.data as WorkspaceItemSectionChangeRequestObject;
    }

    protected onSectionDestroy(): void {}
}