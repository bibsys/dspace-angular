import { Component } from '@angular/core';
import {
  SearchFiltersComponent as BaseComponent,
} from '../../../../../../app/shared/search/search-filters/search-filters.component';
import { SearchConfigurationService } from '../../../../../../app/core/shared/search/search-configuration.service';
import { SEARCH_CONFIG_SERVICE } from 'src/app/my-dspace-page/my-dspace-configuration.service';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { SearchFilterComponent } from 'src/app/shared/search/search-filters/search-filter/search-filter.component';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';


@Component({
  selector: 'ds-themed-search-filters',
  styleUrls: ['../../../../../../app/shared/search/search-filters/search-filters.component.scss'],
  templateUrl: './search-filters.component.html',
  providers: [
    {
      provide: SEARCH_CONFIG_SERVICE,
      useClass: SearchConfigurationService
    }
  ],
  imports: [
    NgIf,
    SearchFilterComponent,
    NgFor,
    AsyncPipe,
    RouterLink,
    TranslateModule,
  ],
  standalone: true,
})
export class SearchFiltersComponent extends BaseComponent {
}
