import { Component, Input, OnChanges } from '@angular/core';
import mapping from './mapping.json';
import { isNotEmpty } from '../../../../../../../../app/shared/empty.util';


@Component({
  selector: 'ds-submission-upload-section-license',
  template: `<img *ngIf="imagePath" [src]="imagePath" [alt]="licenseUri" [height]="height"/>`
})
export class SubmissionSectionUploadFileLicenseComponent implements OnChanges {

  @Input() licenseUri: string;
  @Input() imageDirectoryPath: string = '/assets/uclouvain/images/cc-licences-badges';
  @Input() height: number = 20;
  imagePath: string;


  ngOnChanges(changes: any) {
    if (changes.hasOwnProperty('licenseUri')) {
      const icon = mapping[this.extractLicenseKey()] || undefined;
      if (icon !== undefined) {
        this.imagePath = this.imageDirectoryPath + '/' + icon;
      }
    }
  }

  private extractLicenseKey(): string {
    const urlSequences = new URL(this.licenseUri).pathname
      .split('/')
      .filter(e => isNotEmpty(e));
    return (urlSequences.length > 0)
      ? 'cc-' + urlSequences[1]
      : undefined;
  }
}
