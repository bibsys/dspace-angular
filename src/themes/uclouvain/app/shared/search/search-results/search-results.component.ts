import { SearchResultsComponent as BaseComponent } from '../../../../../../app/shared/search/search-results/search-results.component';
import { Component } from '@angular/core';
import { fadeIn, fadeInOut } from '../../../../../../app/shared/animations/fade';
import { AsyncPipe, NgIf } from '@angular/common';
import { ErrorComponent } from 'src/app/shared/error/error.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { ObjectCollectionComponent } from 'src/app/shared/object-collection/object-collection.component';
import { RouterLink } from '@angular/router';
import { SearchExportCsvComponent } from 'src/app/shared/search/search-export-csv/search-export-csv.component';
import { SearchResultsSkeletonComponent } from 'src/app/shared/search/search-results/search-results-skeleton/search-results-skeleton.component';
import { TranslateModule } from '@ngx-translate/core';
import { AlertComponent } from 'src/app/shared/alert/alert.component';

@Component({
  selector: 'ds-themed-search-results',
  templateUrl: './search-results.component.html',
  animations: [fadeIn, fadeInOut],
  imports: [
    AsyncPipe,
    ErrorComponent,
    NgIf,
    NgxSkeletonLoaderModule,
    ObjectCollectionComponent,
    RouterLink,
    SearchExportCsvComponent,
    SearchResultsSkeletonComponent,
    TranslateModule,
    AlertComponent,
  ],
  standalone: true,
})
export class SearchResultsComponent extends BaseComponent {
}
