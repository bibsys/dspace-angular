import { Component } from '@angular/core';
import { ObjectListComponent as BaseComponent} from '../../../../../app/shared/object-list/object-list.component';
import { SearchConfigurationService } from '../../../../../app/core/shared/search/search-configuration.service';
import { SEARCH_CONFIG_SERVICE } from 'src/app/my-dspace-page/my-dspace-configuration.service';
import { PaginationComponent } from 'src/app/shared/pagination/pagination.component';
import { SelectableListItemControlComponent } from 'src/app/shared/object-collection/shared/selectable-list-item-control/selectable-list-item-control.component';
import { ImportableListItemControlComponent } from 'src/app/shared/object-collection/shared/importable-list-item-control/importable-list-item-control.component';
import { ListableObjectComponentLoaderComponent } from 'src/app/shared/object-collection/shared/listable-object/listable-object-component-loader.component';
import { NgClass, NgForOf, NgIf } from '@angular/common';
import { BrowserOnlyPipe } from 'src/app/shared/utils/browser-only.pipe';

/** A component to display a list of objects and widget to navigate through them */
@Component({
  selector: 'ds-themed-object-list',
  styleUrls: ['../../../../../app/shared/object-list/object-list.component.scss'],
  styles: ['li { box-shadow: rgba(0, 0, 0, 0.08) 0px 0px 0px 1px; border-radius: 2px; transition: 0.2s ease; }'],
  templateUrl: './object-list.component.html',
  providers: [
    {
      provide: SEARCH_CONFIG_SERVICE,
      useClass: SearchConfigurationService
    }
  ],
  standalone: true,
  imports: [
    PaginationComponent,
    SelectableListItemControlComponent,
    ImportableListItemControlComponent,
    ListableObjectComponentLoaderComponent,
    NgIf,
    NgClass,
    NgForOf,
    BrowserOnlyPipe,
  ],
})
export class ObjectListComponent extends BaseComponent {}
