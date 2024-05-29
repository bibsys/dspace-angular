import { Component, Input } from '@angular/core';
import mapping from './mapping.json';
import { isNotEmpty } from '../../../../../app/shared/empty.util';

/**
 * Component used to display the CreativeCommons license badge related to a {@BitStreeam}
 *   This license is mainly stored into the `dc.rights.license` bitstream metadata as
 *   a CreativeCommons formatted URI (https://creativecommons.org/share-your-work/cclicenses/)
 */
@Component({
  selector: 'ds-cc-licence',
  template: `<img *ngIf="imagePath" [src]="imagePath" [alt]="licenseUri" [height]="height"/>`
})
export class CreativeCommonsLicenseComponent {

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

  /** extract the CC license key from canonical license URI */
  private extractLicenseKey(): string {
    const urlSequences = new URL(this.licenseUri).pathname
      .split('/')
      .filter(e => isNotEmpty(e));
    return (urlSequences.length > 0)
      ? 'cc-' + urlSequences[1]
      : undefined;
  }

}