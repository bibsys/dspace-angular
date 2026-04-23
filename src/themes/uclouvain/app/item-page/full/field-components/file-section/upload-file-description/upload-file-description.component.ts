import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { DSONameService } from '../../../../../../../../app/core/breadcrumbs/dso-name.service';
import { Bitstream } from '../../../../../../../../app/core/shared/bitstream.model';
import { Item } from '../../../../../../../../app/core/shared/item.model';
import { Subscription } from 'rxjs';
import { hasValue, isNotEmpty } from '../../../../../../../../app/shared/empty.util';
import { ThemedThumbnailComponent } from 'src/app/thumbnail/themed-thumbnail.component';
import { AsyncPipe, NgIf } from '@angular/common';
import { ThemedFileDownloadLinkComponent } from 'src/app/shared/file-download-link/themed-file-download-link.component';
import { FileSizePipe } from 'src/app/shared/utils/file-size-pipe';
import {CreativeCommonsLicenseComponent} from "../../../../../shared/cc-license/creative-commons-licence.component";

/**
 * Component used to display information related to a {@link Bitstream} when a workflow item is
 * fully displayed.
 */
@Component({
  selector: 'ds-upload-file-description',
  styles: [
    '.expendable {transition: 0.2s ease}',
    'h5 { text-overflow: ellipsis; overflow: hidden; white-space: nowrap; overflow-wrap: break-word; }'
  ],
  templateUrl: './upload-file-description.component.html',
  standalone: true,
  imports: [
    ThemedThumbnailComponent,
    NgIf,
    ThemedFileDownloadLinkComponent,
    AsyncPipe,
    FileSizePipe,
    CreativeCommonsLicenseComponent,
  ],
})
export class UploadFileDescriptionComponent implements OnInit, OnDestroy {

  // COMPONENT ATTRIBUTES =====================================================
  @Input() bitstream: Bitstream;
  @Input() item: Item;
  @Input() showThumbnail = true;
  @Input() showDescription = true;

  hideDescription = true;
  private subs: Subscription[] = [];


  // CONSTRUCTOR & HOOKS ======================================================
  constructor(
    public dsoNameService: DSONameService,
  ) { }

  /** OnInit hook */
  ngOnInit() {}

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
