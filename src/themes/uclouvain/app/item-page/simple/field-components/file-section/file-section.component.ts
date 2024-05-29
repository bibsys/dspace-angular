import { Component } from '@angular/core';
import { slideSidebarPadding } from '../../../../../../../app/shared/animations/slide';
import { FileSectionComponent as BaseComponent } from '../../../../../../../app/item-page/simple/field-components/file-section/file-section.component';
import { Observable } from 'rxjs';
import { followLink } from '../../../../../../../app/shared/utils/follow-link-config.model';
import { RemoteData } from '../../../../../../../app/core/data/remote-data';
import { PaginatedList } from '../../../../../../../app/core/data/paginated-list.model';
import { Bitstream } from '../../../../../../../app/core/shared/bitstream.model';

@Component({
    selector: 'ds-item-page-file-section',
    templateUrl: './file-section.component.html',
    animations: [slideSidebarPadding],
})
export class FileSectionComponent extends BaseComponent {


  protected getBitstreamData(): Observable<RemoteData<PaginatedList<Bitstream>>> {
    return this.bitstreamDataService.findAllByItemAndBundleName(
      this.item,
      'ORIGINAL',
      {
        currentPage: this.currentPage,
        elementsPerPage: this.pageSize
      },
      true,
      true,
      followLink('format'),
      followLink('access')
    );
  }
}
