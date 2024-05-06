import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SearchComponent as BaseComponent } from '../../../../../app/shared/search/search.component';
import { pushInOut } from '../../../../../app/shared/animations/push';
import { SearchChartsComponent } from 'src/app/shared/search/search-charts/search-charts.component';
import { PageWithSidebarComponent } from 'src/app/shared/sidebar/page-with-sidebar.component';
import { ViewModeSwitchComponent } from 'src/app/shared/view-mode-switch/view-mode-switch.component';
import { ThemedSearchResultsComponent } from 'src/app/shared/search/search-results/themed-search-results.component';
import { ThemedSearchSidebarComponent } from 'src/app/shared/search/search-sidebar/themed-search-sidebar.component';
import { ThemedSearchFormComponent } from 'src/app/shared/search-form/themed-search-form.component';
import { ItemExportModalLauncherComponent } from 'src/app/shared/search/item-export/item-export-modal-launcher/item-export-modal-launcher.component';
import { SearchLabelsComponent } from 'src/app/shared/search/search-labels/search-labels.component';
import { AsyncPipe, NgIf, NgTemplateOutlet } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ds-themed-search',
  styleUrls: ['../../../../../app/shared/search/search.component.scss'],
  templateUrl: './search.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [pushInOut],
  imports: [
    SearchChartsComponent,
    PageWithSidebarComponent,
    ViewModeSwitchComponent,
    ThemedSearchResultsComponent,
    ThemedSearchSidebarComponent,
    ThemedSearchFormComponent,
    ItemExportModalLauncherComponent,
    SearchLabelsComponent,
    NgIf,
    NgTemplateOutlet,
    TranslateModule,
    AsyncPipe,
    NgbTooltipModule,
  ],
  standalone: true,
})

/**
 * This component renders a sidebar, a search input bar and the search results.
 */
export class SearchComponent extends BaseComponent {
}
