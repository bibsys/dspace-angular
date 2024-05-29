import { Component } from '@angular/core';
import {
    SubmissionSectionUploadFileComponent as BaseComponent
} from 'src/app/submission/sections/upload/file/section-upload-file.component';
import fileExtensions from './file-extensions.json';
import { isNotEmpty } from '../../../../../../../app/shared/empty.util';
import { Metadata } from '../../../../../../../app/core/shared/metadata.utils';
import { MetadataMap } from '../../../../../../../app/core/shared/metadata.models';


/**
 * This component represents a single bitstream contained in the submission
 */
@Component({
  selector: 'ds-submission-upload-section-file',
  styleUrls: ['./section-upload-file.component.scss'],
  templateUrl: './section-upload-file.component.html'
})
export class SubmissionSectionUploadFileComponent extends BaseComponent {

  public metadata: MetadataMap = Object.create({});
  public fileTitleKey = 'title'
  public fileDescriptionKey = 'description'
  public fileLicenceKey = 'licence'

  protected readonly isNotEmpty = isNotEmpty;


  /** OnInit hook */
  ngOnInit() {
    super.ngOnInit();
    if (isNotEmpty(this.fileData.metadata)) {
      this.metadata[this.fileTitleKey] = Metadata.all(this.fileData.metadata, 'dc.title');
      this.metadata[this.fileDescriptionKey] = Metadata.all(this.fileData.metadata, 'dc.description');
      this.metadata[this.fileLicenceKey] = Metadata.all(this.fileData.metadata, 'dc.rights.license');
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
