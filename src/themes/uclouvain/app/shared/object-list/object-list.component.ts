import { Component, OnInit } from '@angular/core';
import { ObjectListComponent as BaseComponent} from '../../../../../app/shared/object-list/object-list.component';
import { PaginationComponent } from 'src/app/shared/pagination/pagination.component';
import { SelectableListItemControlComponent } from 'src/app/shared/object-collection/shared/selectable-list-item-control/selectable-list-item-control.component';
import { ImportableListItemControlComponent } from 'src/app/shared/object-collection/shared/importable-list-item-control/importable-list-item-control.component';
import { ListableObjectComponentLoaderComponent } from 'src/app/shared/object-collection/shared/listable-object/listable-object-component-loader.component';
import { AsyncPipe, NgClass, NgFor, NgIf } from '@angular/common';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { BrowserOnlyPipe } from 'src/app/shared/utils/browser-only.pipe';
import { SearchConfigurationService } from '../../../../../app/core/shared/search/search-configuration.service';
import { SEARCH_CONFIG_SERVICE } from 'src/app/my-dspace-page/my-dspace-configuration.service';

/** A component to display a list of objects and widget to navigate through them */
@Component({
  selector: 'ds-themed-object-list',
  styleUrls: ['../../../../../app/shared/object-list/object-list.component.scss', './object-list.component.scss'],
  templateUrl: './object-list.component.html',
  imports: [
    PaginationComponent,
    SelectableListItemControlComponent,
    ImportableListItemControlComponent,
    ListableObjectComponentLoaderComponent,
    NgIf,
    NgFor,
    NgClass,
    NgbTooltipModule,
    AsyncPipe,
    TranslateModule,
    BrowserOnlyPipe,
  ],
  standalone: true,
  providers: [
    {
      provide: SEARCH_CONFIG_SERVICE,
      useClass: SearchConfigurationService
    }
  ]
})
export class ObjectListComponent extends BaseComponent implements OnInit {

  /** OnInit hook */
  ngOnInit() {
    this.hasBorder = true;  // force border-bottom
  }
}
