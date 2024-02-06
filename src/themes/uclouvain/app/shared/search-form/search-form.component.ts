import { Component } from '@angular/core';
import { SearchFormComponent as BaseComponent } from '../../../../../app/shared/search-form/search-form.component';
import { HostWindowService } from 'src/app/shared/host-window.service';

import { Router } from '@angular/router';
import { SearchService } from 'src/app/core/shared/search/search.service';
import { PaginationService } from 'src/app/core/pagination/pagination.service';
import { SearchConfigurationService } from 'src/app/core/shared/search/search-configuration.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DSpaceObjectDataService } from 'src/app/core/data/dspace-object-data.service';
import { DSONameService } from 'src/app/core/breadcrumbs/dso-name.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'ds-search-form',
  styleUrls: ['search-form.component.scss'],
  templateUrl: 'search-form.component.html'
})
export class SearchFormComponent extends BaseComponent {
  isXsOrSm$: Observable<boolean>;
  constructor(
    protected router: Router,
    protected searchService: SearchService,
    protected paginationService: PaginationService,
    protected searchConfig: SearchConfigurationService,
    protected modalService: NgbModal,
    protected dsoService: DSpaceObjectDataService,
    public dsoNameService: DSONameService,
    protected hostWindowService: HostWindowService
  ){
    super(router, searchService, paginationService, searchConfig, modalService, dsoService, dsoNameService);
    this.isXsOrSm$ = this.hostWindowService.isXsOrSm();
  }
}
