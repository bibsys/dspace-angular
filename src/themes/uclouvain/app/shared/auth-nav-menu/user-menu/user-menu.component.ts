import { Component } from '@angular/core';
import { UserMenuComponent as BaseComponent } from '../../../../../../app/shared/auth-nav-menu/user-menu/user-menu.component';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../../../app/app.reducer';
import { AuthService } from '../../../../../../app/core/auth/auth.service';
import { DSONameService } from '../../../../../../app/core/breadcrumbs/dso-name.service';
import { ConfigurationDataService } from '../../../../../../app/core/data/configuration-data.service';
import { Observable } from 'rxjs';
import { getFirstCompletedRemoteData } from '../../../../../../app/core/shared/operators';
import { map } from 'rxjs/operators';
import { RemoteData } from '../../../../../../app/core/data/remote-data';
import { ConfigurationProperty } from '../../../../../../app/core/shared/configuration-property.model';
import { isNotEmpty } from '../../../../../../app/shared/empty.util';

/**
 * Component representing the {@link UserMenuComponent} of a page
 */
@Component({
  selector: 'ds-user-menu',
  templateUrl: 'user-menu.component.html',
  styleUrls: ['../../../../../../app/shared/auth-nav-menu/user-menu/user-menu.component.scss'],
})
export class UserMenuComponent extends BaseComponent {

  subscriptionEnabled$: Observable<boolean>;

  constructor(
    protected store: Store<AppState>,
    protected authService: AuthService,
    public dsoNameService: DSONameService,
    private configurationService: ConfigurationDataService
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
  }

}
