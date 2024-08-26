import { Component, OnInit } from '@angular/core';
import { ObjectListComponent as BaseComponent} from '../../../../../app/shared/object-list/object-list.component';
import { SEARCH_CONFIG_SERVICE } from '../../../../../app/my-dspace-page/my-dspace-page.component';
import { SearchConfigurationService } from '../../../../../app/core/shared/search/search-configuration.service';

/** A component to display a list of objects and widget to navigate through them */
@Component({
  selector: 'ds-object-list',
  styleUrls: ['../../../../../app/shared/object-list/object-list.component.scss', './object-list.component.scss'],
  templateUrl: './object-list.component.html',
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
