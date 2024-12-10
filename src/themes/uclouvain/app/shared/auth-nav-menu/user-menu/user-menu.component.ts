import { Component, OnDestroy } from '@angular/core';
import {
  UserMenuComponent as BaseComponent
} from '../../../../../../app/shared/auth-nav-menu/user-menu/user-menu.component';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../../../app/app.reducer';
import { AuthService } from '../../../../../../app/core/auth/auth.service';
import { DSONameService } from '../../../../../../app/core/breadcrumbs/dso-name.service';
import { ConfigurationDataService } from '../../../../../../app/core/data/configuration-data.service';
import { BehaviorSubject, Subscription } from 'rxjs';
import { getFirstSucceededRemoteWithNotEmptyData } from '../../../../../../app/core/shared/operators';
import { map } from 'rxjs/operators';
import { RemoteData } from '../../../../../../app/core/data/remote-data';
import { ConfigurationProperty } from '../../../../../../app/core/shared/configuration-property.model';
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

  subscriptionEnabled$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  profileEnabled$: BehaviorSubject<boolean> = new BehaviorSubject(false);
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
    // Is user custom subscriptions is enabled ?
    this.subscriptions.add(
      this.configurationService
        .findByPropertyName('context-menu-entry.subscriptions.enabled')
        .pipe(
          getFirstSucceededRemoteWithNotEmptyData(),
          map((res: RemoteData<ConfigurationProperty>) => res.payload.values[0].toLowerCase() === 'true')
        )
        .subscribe((enabled: boolean) => this.subscriptionEnabled$.next(enabled))
    );
    // Is the user is admin or masquerade another user
    this.subscriptions.add(
      this.roleService
        .checkRole(RoleType.Admin)
        .subscribe((isAdmin: boolean) => this.profileEnabled$.next(isAdmin || this.authService.isImpersonating()))
    );
    // Build "myDspace" page params to use
    this.subscriptions.add(
      this.roleService
        .checkRole(RoleType.Controller)
        .subscribe((isController: boolean) => {
          if (isController) {
            this.myDspaceQueryParams = {configuration: 'workflow'};
          }
        }),
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

}
