import { Component, OnInit } from '@angular/core';
import { Metadata } from 'src/app/core/shared/metadata.utils';
import { extractLicenseType } from 'src/app/shared/creative-commons.util';
import { isNotEmpty } from 'src/app/shared/empty.util';
import { SubmissionSectionUploadFileViewComponent as BaseComponent } from 'src/app/submission/sections/upload/file/view/section-upload-file-view.component';

@Component({
    selector: 'ds-submission-section-upload-file-view',
    templateUrl: 'section-upload-file-view.component.html',
    styles: ['.file-license-type{position: absolute; top: 0; right: 0;}']
})
export class SubmissionSectionUploadFileViewComponent extends BaseComponent implements OnInit {

    /**
    * The bitstream's license type key
    */
    public fileLicenseTypeKey = 'LicenseType';

    ngOnInit(): void {
        if (isNotEmpty(this.fileData.metadata)) {
            // Fill in necessary metadata
            this.metadata[this.fileTitleKey] = Metadata.all(this.fileData.metadata, 'dc.title');
            this.metadata[this.fileDescrKey] = Metadata.all(this.fileData.metadata, 'dc.description');
            this.metadata[this.fileLicenseTypeKey] = Metadata.all(this.fileData.metadata, 'dc.rights.license');
        }
        this.fileCheckSum = this.fileData.checkSum;
        this.fileFormat = this.fileData.format.shortDescription;
    }

    // Method used in HTML to recover the license type name
    getLicenseType(uri: string){
        return extractLicenseType(uri).toUpperCase();
    }
}
