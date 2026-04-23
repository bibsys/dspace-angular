import { Component } from '@angular/core';
import {
  SearchSidebarComponent as BaseComponent,
} from '../../../../../../app/shared/search/search-sidebar/search-sidebar.component';
import { SearchConfigurationService } from '../../../../../../app/core/shared/search/search-configuration.service';
import { SEARCH_CONFIG_SERVICE } from 'src/app/my-dspace-page/my-dspace-configuration.service';
import { SearchSwitchConfigurationComponent } from 'src/app/shared/search/search-switch-configuration/search-switch-configuration.component';
import { ThemedSearchFiltersComponent } from 'src/app/shared/search/search-filters/themed-search-filters.component';
import { NgIf } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';


@Component({
  selector: 'ds-themed-search-sidebar',
  styleUrls: ['./search-sidebar.component.scss'],
  templateUrl: './search-sidebar.component.html',
  providers: [
    {
      provide: SEARCH_CONFIG_SERVICE,
      useClass: SearchConfigurationService
    }
  ],
  imports: [SearchSwitchConfigurationComponent, ThemedSearchFiltersComponent, NgIf, TranslateModule],
  standalone: true,
})

export class SearchSidebarComponent extends BaseComponent {
}
