import { AsyncPipe, NgIf, NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { ThemedSearchFormComponent } from '../../../../../app/shared/search-form/themed-search-form.component';
import {
  ItemExportModalLauncherComponent
} from '../../../../../app/shared/search/item-export/item-export-modal-launcher/item-export-modal-launcher.component';
import { SearchChartsComponent } from '../../../../../app/shared/search/search-charts/search-charts.component';
import { SearchLabelsComponent } from '../../../../../app/shared/search/search-labels/search-labels.component';
import {
  ThemedSearchResultsComponent
} from '../../../../../app/shared/search/search-results/themed-search-results.component';
import {
  ThemedSearchSidebarComponent
} from '../../../../../app/shared/search/search-sidebar/themed-search-sidebar.component';
import { SearchComponent as BaseComponent } from '../../../../../app/shared/search/search.component';
import { pushInOut } from '../../../../../app/shared/animations/push';
import { PageWithSidebarComponent } from '../../../../../app/shared/sidebar/page-with-sidebar.component';
import { ViewModeSwitchComponent } from '../../../../../app/shared/view-mode-switch/view-mode-switch.component';
import { SearchExportCsvComponent } from 'src/app/shared/search/search-export-csv/search-export-csv.component';

@Component({
  selector: 'ds-themed-search',
  styleUrls: ['../../../../../app/shared/search/search.component.scss'],
  templateUrl: './search.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [pushInOut],
  imports: [
    SearchChartsComponent,
    NgIf,
    NgTemplateOutlet,
    AsyncPipe,
    PageWithSidebarComponent,
    ViewModeSwitchComponent,
    TranslateModule,
    ThemedSearchResultsComponent,
    ThemedSearchSidebarComponent,
    NgbTooltipModule,
    ThemedSearchFormComponent,
    ItemExportModalLauncherComponent,
    SearchLabelsComponent,
    SearchExportCsvComponent,
  ],
  standalone: true
})

/**
 * This component renders a sidebar, a search input bar and the search results.
 */
export class SearchComponent extends BaseComponent implements OnInit {
  ngOnInit(): void {
    super.ngOnInit();
    this.showThumbnails = false;
  }
}
