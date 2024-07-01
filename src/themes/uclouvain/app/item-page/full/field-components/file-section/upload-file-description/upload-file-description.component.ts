import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { DSONameService } from '../../../../../../../../app/core/breadcrumbs/dso-name.service';
import { Bitstream } from '../../../../../../../../app/core/shared/bitstream.model';
import { Item } from '../../../../../../../../app/core/shared/item.model';
import { AccessConditionObject } from '../../../../../../../../app/core/submission/models/access-condition.model';
import { BitstreamAccessConditions } from '../../../../../../../../app/core/shared/bitstream-access-conditions.model';
import { getFirstSucceededRemoteDataWithNotEmptyPayload } from '../../../../../../../../app/core/shared/operators';
import { Subscription } from 'rxjs';
import { BitstreamDirectDownloadURL } from '../../../../../../../../app/core/shared/bitstream-direct-download-url.model';

/**
 * Component used to display information related to a {@Bistream bitstream} when a workflow item is
 * fully displayed.
 */
@Component({
  selector: 'ds-upload-file-description',
  styleUrls: ['./upload-file-description.component.scss'],
  templateUrl: './upload-file-description.component.html'
})
export class UploadFileDescriptionComponent implements OnInit, OnDestroy {

  // COMPONENT ATTRIBUTES =====================================================
  @Input() bitstream: Bitstream;
  @Input() item: Item;
  @Input() showThumbnail = true;
  @Input() showDescription = true;
  @Input() policyView: 'masterPolicy'|'allPolicies' = 'masterPolicy';
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
        }),
      this.bitstream.download_url
        .pipe(getFirstSucceededRemoteDataWithNotEmptyPayload())
        .subscribe((payload: BitstreamDirectDownloadURL) => this.downloadUrl = payload.url)
    );
  }

  /** OnDestroy hook */
  ngOnDestroy() {
    this.subs.forEach((sub) => sub.unsubscribe());
  }

  // PUBLIC METHODS ===========================================================
  /** Check if the bitstream has a `nodownload` metadata */
  hasNoDownload() {
    return this.bitstream?.allMetadataValues('bitstream.viewer.provider').includes('nodownload');
  }
}
