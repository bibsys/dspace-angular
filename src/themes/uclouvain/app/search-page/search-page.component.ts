import { Component, OnInit } from '@angular/core';

import { SearchConfigurationService } from '../../../../app/core/shared/search/search-configuration.service';
import { SEARCH_CONFIG_SERVICE } from '../../../../app/my-dspace-page/my-dspace-page.component';
import { SearchPageComponent as BaseComponent } from '../../../../app/search-page/search-page.component';
import { environment } from 'src/environments/environment';
import { SearchSettingConfig } from '../../../../config/search-page-config.interface';

@Component({
  selector: 'ds-search-page',
  templateUrl: './search-page.component.html',
  providers: [{
    provide: SEARCH_CONFIG_SERVICE,
    useClass: SearchConfigurationService,
  }],
})

/**
 * This component represents the whole search page
 * It renders search results depending on the current search options
 */
export class SearchPageComponent extends BaseComponent implements OnInit {
  protected renderOnServerSide: boolean;
  protected showCharts: boolean;
  protected showCsvExport: boolean;
  protected showExport: boolean;
  protected trackStatistics: boolean;

  ngOnInit() {
    if (environment.search?.settings) {
      this.renderOnServerSide = this.getBooleanSetting(environment.search.settings, 'renderOnServerSide', false);
      this.showCharts = this.getBooleanSetting(environment.search.settings, 'showCharts', true);
      this.showCsvExport = this.getBooleanSetting(environment.search.settings, 'showCsvExport', true);
      this.showExport = this.getBooleanSetting(environment.search.settings, 'showExport', true);
      this.trackStatistics = this.getBooleanSetting(environment.search.settings, 'trackStatistics', true);
    }
  }

  private getBooleanSetting(settings: SearchSettingConfig, key: string, default_value: boolean): boolean {
    return (settings.hasOwnProperty(key))
      ? settings[key]
      : default_value;
  }
}

