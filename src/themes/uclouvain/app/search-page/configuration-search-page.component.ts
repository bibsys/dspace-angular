import { AsyncPipe, NgIf, NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { SearchConfigurationService } from 'src/app/core/shared/search/search-configuration.service';
import { SEARCH_CONFIG_SERVICE } from 'src/app/my-dspace-page/my-dspace-configuration.service';
import { ConfigurationSearchPageComponent as BaseComponent } from 'src/app/search-page/configuration-search-page.component';
import { pushInOut } from 'src/app/shared/animations/push';
import { ThemedSearchFormComponent } from 'src/app/shared/search-form/themed-search-form.component';
import { ItemExportModalLauncherComponent } from 'src/app/shared/search/item-export/item-export-modal-launcher/item-export-modal-launcher.component';
import { SearchChartsComponent } from 'src/app/shared/search/search-charts/search-charts.component';
import { SearchLabelsComponent } from 'src/app/shared/search/search-labels/search-labels.component';
import { ThemedSearchResultsComponent } from 'src/app/shared/search/search-results/themed-search-results.component';
import { ThemedSearchSidebarComponent } from 'src/app/shared/search/search-sidebar/themed-search-sidebar.component';
import { PageWithSidebarComponent } from 'src/app/shared/sidebar/page-with-sidebar.component';
import { ViewModeSwitchComponent } from 'src/app/shared/view-mode-switch/view-mode-switch.component';

@Component({
    selector: 'ds-themed-configuration-search-page',
    styleUrls: ['../../../../app/shared/search/search.component.scss'],
    templateUrl: '../../../../app/shared/search/search.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [pushInOut],
    providers: [
        {
            provide: SEARCH_CONFIG_SERVICE,
            useClass: SearchConfigurationService
        }  
    ],
    imports: [
        AsyncPipe,
        NgIf,
        NgTemplateOutlet,
        PageWithSidebarComponent,
        ThemedSearchFormComponent,
        ThemedSearchResultsComponent,
        ThemedSearchSidebarComponent,
        TranslateModule,
        SearchLabelsComponent,
        ViewModeSwitchComponent,
        NgbTooltipModule,
        ItemExportModalLauncherComponent,
        SearchChartsComponent,
    ],
    standalone: true,
})
export class ConfigurationSearchPageComponent extends BaseComponent {}
