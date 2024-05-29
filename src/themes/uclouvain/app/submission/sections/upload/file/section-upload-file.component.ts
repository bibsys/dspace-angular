import { Component, Input } from '@angular/core';
import {
    SubmissionSectionUploadFileComponent as BaseComponent
} from 'src/app/submission/sections/upload/file/section-upload-file.component';
import fileExtensions from './file-extensions.json';
import { isEmpty, isNotEmpty } from '../../../../../../../app/shared/empty.util';
import { Metadata } from '../../../../../../../app/core/shared/metadata.utils';
import { MetadataMap, MetadataValue } from '../../../../../../../app/core/shared/metadata.models';
import {
  FormFieldMetadataValueObject
} from '../../../../../../../app/shared/form/builder/models/form-field-metadata-value.model';
import { AccessConditionObject } from '../../../../../../../app/core/submission/models/access-condition.model';


/**
 * This component represents a single bitstream contained in the submission
 */
@Component({
  selector: 'ds-submission-upload-section-file',
  styleUrls: ['./section-upload-file.component.scss'],
  templateUrl: './section-upload-file.component.html'
})
export class SubmissionSectionUploadFileComponent extends BaseComponent {

  @Input() defaultLicense = 'https://creativecommons.org/licenses/by/4.0';

  public metadata: MetadataMap = Object.create({});
  public fileTitleKey = 'title'
  public fileDescriptionKey = 'description'
  public fileLicence: string;
  public fileAccess: AccessConditionObject[];

  protected readonly isNotEmpty = isNotEmpty;


  /** OnInit hook */
  ngOnInit() {
    super.ngOnInit();
    if (isNotEmpty(this.fileData.metadata)) {
      this.metadata[this.fileTitleKey] = Metadata.all(this.fileData.metadata, 'dc.title');
      this.metadata[this.fileDescriptionKey] = Metadata.all(this.fileData.metadata, 'dc.description');
      this.fileLicence = Metadata.firstValue(this.fileData.metadata, 'dc.rights.license');;
    }
    // Set default file creative commons licence if doesn't exists into metadata
    if (isEmpty(this.fileLicence)) {
      this.fileLicence = this.defaultLicense;
    }
    // Get file access condition. If it doesn't exist, set default access for preview.
    this.fileAccess = this.fileData?.accessConditions;
    if (isEmpty(this.fileAccess)){
      this.fileAccess = [Object.assign(new AccessConditionObject(), {
        id: 'default',
        name:'openaccess'
      })];
    }
  }

  /** Get the path to the best possible icon related to this file/bitstream */
  getFileIcon() {
    const unknown = fileExtensions[''];
    // Extract extension from the filename
    const re = /(?:\.([^.]+))?$/;
    let ext = re.exec(this.fileName)[1] || undefined;
    ext = (ext !== undefined) ? '.'+ext : '';
    const image = (fileExtensions[ext] || unknown) + '.svg';
    return 'assets/uclouvain/images/file-icons/' + image;
  }
}
