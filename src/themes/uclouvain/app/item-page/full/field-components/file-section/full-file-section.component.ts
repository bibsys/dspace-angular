import { Component } from '@angular/core';
import { FullFileSectionComponent as BaseComponent } from '../../../../../../../app/item-page/full/field-components/file-section/full-file-section.component';
import { switchMap, tap } from 'rxjs/operators';
import {
  PaginationComponentOptions
} from '../../../../../../../app/shared/pagination/pagination-component-options.model';
import { followLink } from '../../../../../../../app/shared/utils/follow-link-config.model';
import { RemoteData } from '../../../../../../../app/core/data/remote-data';
import { PaginatedList } from '../../../../../../../app/core/data/paginated-list.model';
import { Bitstream } from '../../../../../../../app/core/shared/bitstream.model';
import { hasValue } from '../../../../../../../app/shared/empty.util';
import { MetadataFieldWrapperComponent } from 'src/app/shared/metadata-field-wrapper/metadata-field-wrapper.component';
import { PaginationComponent } from 'src/app/shared/pagination/pagination.component';
import { UploadFileDescriptionComponent } from './upload-file-description/upload-file-description.component';
import { VarDirective } from 'src/app/shared/utils/var.directive';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'ds-themed-item-page-full-file-section',
  styleUrls: ['../../../../../../../app/item-page/full/field-components/file-section/full-file-section.component.scss'],
  templateUrl: './full-file-section.component.html',
  imports: [
    MetadataFieldWrapperComponent,
    PaginationComponent,
    UploadFileDescriptionComponent,
    VarDirective,
    NgIf,
    NgFor,
    AsyncPipe,
    TranslateModule,
  ],
  standalone: true,
})
export class FullFileSectionComponent extends BaseComponent {

  initialize(): void {
    this.originals$ = this.paginationService.getCurrentPagination(this.originalOptions.id, this.originalOptions).pipe(
      switchMap((options: PaginationComponentOptions) => this.bitstreamDataService.findAllByItemAndBundleName(
        this.item,
        'ORIGINAL',
        {elementsPerPage: options.pageSize, currentPage: options.currentPage},
        true,
        true,
        followLink('format'),
        followLink('thumbnail'),
        followLink('access'),
        followLink('download_url')
      )),
      tap((rd: RemoteData<PaginatedList<Bitstream>>) => {
          if (hasValue(rd.errorMessage)) {
            this.notificationsService.error(this.translateService.get('file-section.error.header'), `${rd.statusCode} ${rd.errorMessage}`);
          }
        }
      )
    );
  }
}
