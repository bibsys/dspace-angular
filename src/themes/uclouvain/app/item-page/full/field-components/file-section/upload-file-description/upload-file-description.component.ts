import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { DSONameService } from '../../../../../../../../app/core/breadcrumbs/dso-name.service';
import { Bitstream } from '../../../../../../../../app/core/shared/bitstream.model';
import { Item } from '../../../../../../../../app/core/shared/item.model';
import { AccessConditionObject } from '../../../../../../../../app/core/submission/models/access-condition.model';
import { BitstreamAccessConditions } from '../../../../../../../../app/core/shared/bitstream-acces-conditions.model';
import { getFirstSucceededRemoteDataWithNotEmptyPayload } from '../../../../../../../../app/core/shared/operators';
import { Subscription } from 'rxjs';
import { hasValue, isNotEmpty } from '../../../../../../../../app/shared/empty.util';
import { ThemedThumbnailComponent } from 'src/app/thumbnail/themed-thumbnail.component';
import { AsyncPipe, NgIf } from '@angular/common';
import { AccessConditionsComponent } from 'src/themes/uclouvain/app/shared/access-conditions/access-conditions.component';
import { CreativeCommonsLicenseComponent } from 'src/themes/uclouvain/app/shared/cc-license/creative-commons-licence.component';
import { ThemedFileDownloadLinkComponent } from 'src/app/shared/file-download-link/themed-file-download-link.component';
import { FileSizePipe } from 'src/app/shared/utils/file-size-pipe';

/**
 * Component used to display information related to a {@link Bitstream} when a workflow item is
 * fully displayed.
 */
@Component({
  selector: 'ds-upload-file-description',
  styles: ['.expendable {transition: 0.2s ease}'],
  templateUrl: './upload-file-description.component.html',
  standalone: true,
  imports: [
    ThemedThumbnailComponent,
    NgIf,
    AccessConditionsComponent,
    CreativeCommonsLicenseComponent,
    ThemedFileDownloadLinkComponent,
    AsyncPipe,
    FileSizePipe,
  ],
})
export class UploadFileDescriptionComponent implements OnInit, OnDestroy {

  // COMPONENT ATTRIBUTES =====================================================
  @Input() bitstream: Bitstream;
  @Input() item: Item;
  @Input() showThumbnail = true;
  @Input() showDescription = true;
  @Input() policyView: 'masterPolicy' | 'allPolicies' = 'masterPolicy';
  @Input() defaultPolicy: AccessConditionObject = Object.assign(new AccessConditionObject(), {
    id: '-1', name: 'openaccess'
  });

  hideDescription = true;
  accessConditions: BitstreamAccessConditions = undefined;
  downloadUrl: string;
  private subs: Subscription[] = [];


  // CONSTRUCTOR & HOOKS ======================================================
  constructor(
    public dsoNameService: DSONameService,
  ) { }

  /** OnInit hook */
  ngOnInit() {
    if (isNotEmpty(this.bitstream.access)) {
      this.subs.push(
        this.bitstream.access
          .pipe(getFirstSucceededRemoteDataWithNotEmptyPayload())
          .subscribe((payload: BitstreamAccessConditions) => {
            if (payload.policies.length === 0) {
              payload.policies = [this.defaultPolicy];
            }
            if (payload?.masterPolicy === undefined) {
              payload.masterPolicy = this.defaultPolicy;
            }
            this.accessConditions = payload;
          })
      );
    }
  }

  /** OnDestroy hook */
  ngOnDestroy() {
    this.subs.filter(sub => hasValue(sub)).forEach((sub) => sub.unsubscribe());
  }

  // PUBLIC METHODS ===========================================================
  /** Check if the bitstream has a `nodownload` metadata */
  hasNoDownload() {
    return this.bitstream?.allMetadataValues('bitstream.viewer.provider').includes('nodownload');
  }
}