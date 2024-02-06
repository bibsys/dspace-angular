import { Component, Input, OnInit } from '@angular/core';
import { extractLicenseType } from 'src/app/shared/creative-commons.util';
import { isUndefined } from 'src/app/shared/empty.util';

/**
 * Component that renders an icon for a given creative common URI
 */
@Component({
    selector: 'ds-submission-section-upload-file-license-type',
    templateUrl: './section-upload-file-license-type.component.html'
})
export class SubmissionSectionUploadFileLicenseTypeComponent implements OnInit {

    @Input() licenseTypeURI: string;

    @Input() maxHeight = 30;

    imagesPath = 'assets/uclouvain/images/creative-commons';

    // This object is used to map Creative Commons types to their corresponding logo
    imagesMap = {
        'cc-by': this.imagesPath + '/by.png',
        'cc-by-sa': this.imagesPath + '/by-sa.png',
        'cc-by-nc': this.imagesPath + '/by-nc.png',
        'cc-by-nc-sa': this.imagesPath + '/by-nc-sa.png',
        'cc-by-nd': this.imagesPath + '/by-nd.png',
        'cc-by-nc-nd': this.imagesPath + '/by-nc-nd.png'
    };

    imageToDisplay: string;

    selectedLicense: string;

    ngOnInit(): void {
        if (!isUndefined(this.licenseTypeURI)){
            this.selectedLicense = extractLicenseType(this.licenseTypeURI);
            this.imageToDisplay = this.imagesMap[this.selectedLicense];
        }
    }
}
