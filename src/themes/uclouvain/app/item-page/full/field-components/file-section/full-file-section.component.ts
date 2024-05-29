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

@Component({
  selector: 'ds-item-page-full-file-section',
  styleUrls: ['../../../../../../../app/item-page/full/field-components/file-section/full-file-section.component.scss'],
  templateUrl: './full-file-section.component.html',
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
