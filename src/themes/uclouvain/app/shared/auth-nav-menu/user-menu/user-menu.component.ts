import { Component, OnDestroy } from '@angular/core';
import {
  UserMenuComponent as BaseComponent
} from '../../../../../../app/shared/auth-nav-menu/user-menu/user-menu.component';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../../../app/app.reducer';
import { AuthService } from '../../../../../../app/core/auth/auth.service';
import { DSONameService } from '../../../../../../app/core/breadcrumbs/dso-name.service';
import { ConfigurationDataService } from '../../../../../../app/core/data/configuration-data.service';
import { Observable, Subscription } from 'rxjs';
import { getFirstCompletedRemoteData } from '../../../../../../app/core/shared/operators';
import { map } from 'rxjs/operators';
import { RemoteData } from '../../../../../../app/core/data/remote-data';
import { ConfigurationProperty } from '../../../../../../app/core/shared/configuration-property.model';
import { isNotEmpty } from '../../../../../../app/shared/empty.util';
import { RoleService } from '../../../../../../app/core/roles/role.service';
import { RoleType } from '../../../../../../app/core/roles/role-types';

/**
 * Component representing the {@link UserMenuComponent} of a page
 */
@Component({
  selector: 'ds-user-menu',
  templateUrl: 'user-menu.component.html',
  styleUrls: ['../../../../../../app/shared/auth-nav-menu/user-menu/user-menu.component.scss'],
})
export class UserMenuComponent extends BaseComponent implements OnDestroy {

  subscriptionEnabled$: Observable<boolean>;
  myDspaceQueryParams = {};
  private subscriptions = new Subscription();

  constructor(
    protected store: Store<AppState>,
    protected authService: AuthService,
    public dsoNameService: DSONameService,
    private configurationService: ConfigurationDataService,
    private roleService: RoleService
  ) {
    super(store, authService, dsoNameService);
  }

  ngOnInit() {
    super.ngOnInit();
    this.subscriptionEnabled$ = this.configurationService
      .findByPropertyName('context-menu-entry.subscriptions.enabled')
      .pipe(
        getFirstCompletedRemoteData(),
        map((res: RemoteData<ConfigurationProperty>) => {
          return res.hasSucceeded
            && res.payload
            && isNotEmpty(res.payload.values)
            && res.payload.values[0].toLowerCase() === 'true';
        })
    );

    this.subscriptions.add(
      this.roleService
        .checkRole(RoleType.Controller)
        .subscribe((isController: boolean) => {
          if (isController) {
            this.myDspaceQueryParams = {configuration: 'workflow'};
          }
        })
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

}
