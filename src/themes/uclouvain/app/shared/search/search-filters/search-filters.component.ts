import { Component } from '@angular/core';
import {
  SearchFiltersComponent as BaseComponent,
} from '../../../../../../app/shared/search/search-filters/search-filters.component';
import { SEARCH_CONFIG_SERVICE } from '../../../../../../app/my-dspace-page/my-dspace-page.component';
import { SearchConfigurationService } from '../../../../../../app/core/shared/search/search-configuration.service';


@Component({
  selector: 'ds-search-filters',
  styleUrls: ['../../../../../../app/shared/search/search-filters/search-filters.component.scss'],
  templateUrl: './search-filters.component.html',
  providers: [
    {
      provide: SEARCH_CONFIG_SERVICE,
      useClass: SearchConfigurationService
    }
  ]

})
export class SearchFiltersComponent extends BaseComponent {
}
