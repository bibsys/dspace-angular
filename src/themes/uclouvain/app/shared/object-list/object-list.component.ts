import { Component } from '@angular/core';
import { ObjectListComponent as BaseComponent} from '../../../../../app/shared/object-list/object-list.component';
import { SEARCH_CONFIG_SERVICE } from '../../../../../app/my-dspace-page/my-dspace-page.component';
import { SearchConfigurationService } from '../../../../../app/core/shared/search/search-configuration.service';

/** A component to display a list of objects and widget to navigate through them */
@Component({
  selector: 'ds-object-list',
  styleUrls: ['../../../../../app/shared/object-list/object-list.component.scss'],
  styles: ['li { box-shadow: rgba(0, 0, 0, 0.08) 0px 0px 0px 1px; border-radius: 2px; transition: 0.2s ease; }'],
  templateUrl: './object-list.component.html',
  providers: [
    {
      provide: SEARCH_CONFIG_SERVICE,
      useClass: SearchConfigurationService
    }
  ]
})
export class ObjectListComponent extends BaseComponent {}