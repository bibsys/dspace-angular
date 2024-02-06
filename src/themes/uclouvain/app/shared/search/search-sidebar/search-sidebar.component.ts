/**
 * The contents of this file are subject to the license and copyright
 * detailed in the LICENSE_ATMIRE and NOTICE_ATMIRE files at the root of the source
 * tree and available online at
 *
 * https://www.atmire.com/software-license/
 */
import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { SearchConfigurationService } from '../../../../../../app/core/shared/search/search-configuration.service';
import { SEARCH_CONFIG_SERVICE } from '../../../../../../app/my-dspace-page/my-dspace-configuration.service';
import {
  ThemedSearchFiltersComponent
} from '../../../../../../app/shared/search/search-filters/themed-search-filters.component';
import {
  ThemedSearchSettingsComponent
} from '../../../../../../app/shared/search/search-settings/themed-search-settings.component';
import { SearchSidebarComponent as BaseComponent } from '../../../../../../app/shared/search/search-sidebar/search-sidebar.component';
import {
  SearchSwitchConfigurationComponent
} from '../../../../../../app/shared/search/search-switch-configuration/search-switch-configuration.component';
import { ViewModeSwitchComponent } from '../../../../../../app/shared/view-mode-switch/view-mode-switch.component';
import { environment } from '../../../../../../environments/environment';
import { SearchSettingConfig } from '../../../../../../config/search-page-config.interface';


@Component({
  selector: 'ds-themed-search-sidebar',
  styleUrls: ['../../../../../../app/shared/search/search-sidebar/search-sidebar.component.scss'],
  templateUrl: './search-sidebar.component.html',
  providers: [
    {
      provide: SEARCH_CONFIG_SERVICE,
      useClass: SearchConfigurationService,
    },
  ],
  standalone: true,
  imports: [
    TranslateModule,
    ViewModeSwitchComponent,
    NgIf,
    SearchSwitchConfigurationComponent,
    ThemedSearchFiltersComponent,
    ThemedSearchSettingsComponent
  ]
})

export class SearchSidebarComponent extends BaseComponent implements OnInit {

  protected showSwitchConfiguration: boolean;
  protected showInPlaceSearchSetting: boolean;

  ngOnInit() {
    if (environment.search?.settings) {
      this.showSwitchConfiguration = this.getBooleanSetting(environment.search.settings, 'showSwitchConfiguration', true);
      this.showInPlaceSearchSetting = this.getBooleanSetting(environment.search.settings, 'showInPlaceSearchSetting', true);
    }

  }

  private getBooleanSetting(settings: SearchSettingConfig, key: string, default_value: boolean): boolean {
    return (settings.hasOwnProperty(key))
      ? settings[key]
      : default_value;
  }
}
