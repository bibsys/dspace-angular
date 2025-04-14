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
import { TranslateModule } from '@ngx-translate/core';
import { VarDirective } from 'src/app/shared/utils/var.directive';
import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { PaginationComponent } from 'src/app/shared/pagination/pagination.component';
import { UploadFileDescriptionComponent } from './upload-file-description/upload-file-description.component';

@Component({
  selector: 'ds-themed-item-page-full-file-section',
  styleUrls: ['../../../../../../../app/item-page/full/field-components/file-section/full-file-section.component.scss'],
  templateUrl: './full-file-section.component.html',
  standalone: true,
  imports: [
    MetadataFieldWrapperComponent,
    TranslateModule,
    VarDirective,
    NgIf,
    NgForOf,
    PaginationComponent,
    UploadFileDescriptionComponent,
    AsyncPipe,
  ]
})
export class FullFileSectionComponent extends BaseComponent {

  initialize(): void {
    this.originals$ = this.paginationService.getCurrentPagination(this.originalOptions.id, this.originalOptions).pipe(
      switchMap((options: PaginationComponentOptions) => this.bitstreamDataService.findAllByItemAndBundleName(
        this.item,
        'ORIGINAL',
        { elementsPerPage: options.pageSize, currentPage: options.currentPage },
        true,
        true,
        followLink('format'),
        followLink('thumbnail'),
        followLink('access')
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