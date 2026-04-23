import {Component} from '@angular/core';
import { slideSidebarPadding } from '../../../../../../../app/shared/animations/slide';
import { FileSectionComponent as BaseComponent } from '../../../../../../../app/item-page/simple/field-components/file-section/file-section.component';
import { Observable } from 'rxjs';
import { followLink } from '../../../../../../../app/shared/utils/follow-link-config.model';
import { RemoteData } from '../../../../../../../app/core/data/remote-data';
import { PaginatedList } from '../../../../../../../app/core/data/paginated-list.model';
import { Bitstream } from '../../../../../../../app/core/shared/bitstream.model';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { MetadataFieldWrapperComponent } from 'src/app/shared/metadata-field-wrapper/metadata-field-wrapper.component';
import { UploadFileDescriptionComponent } from '../../../full/field-components/file-section/upload-file-description/upload-file-description.component';
import { ThemedLoadingComponent } from 'src/app/shared/loading/themed-loading.component';
import { TranslateModule } from '@ngx-translate/core';
import { VarDirective } from 'src/app/shared/utils/var.directive';

@Component({
  selector: 'ds-themed-item-page-file-section',
  templateUrl: './file-section.component.html',
  styleUrls: ['./file-section.component.scss'],
  animations: [slideSidebarPadding],
  standalone: true,
  imports: [
    VarDirective,
    AsyncPipe,
    MetadataFieldWrapperComponent,
    NgIf,
    NgFor,
    UploadFileDescriptionComponent,
    ThemedLoadingComponent,
    TranslateModule,
  ]
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
      followLink('format')
    );
  }
}
