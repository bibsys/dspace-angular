import { Component } from '@angular/core';
import { SearchPageComponent as BaseComponent } from 'src/app/search-page/search-page.component';
import { SearchConfigurationService } from 'src/app/core/shared/search/search-configuration.service';
import { SEARCH_CONFIG_SERVICE } from 'src/app/my-dspace-page/my-dspace-configuration.service';
import { ThemedSearchComponent } from 'src/app/shared/search/themed-search.component';

@Component({
    selector: 'ds-themed-search-page',
    templateUrl: './search-page.component.html',
    providers: [
      {
        provide: SEARCH_CONFIG_SERVICE,
        useClass: SearchConfigurationService
      }
    ],
    imports: [
      ThemedSearchComponent,
    ],
    standalone: true,
})
export class SearchPageComponent extends BaseComponent {}
