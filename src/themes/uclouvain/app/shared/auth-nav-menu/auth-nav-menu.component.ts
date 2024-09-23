import { Component, OnInit } from '@angular/core';
import { AuthNavMenuComponent as BaseComponent } from '../../../../../app/shared/auth-nav-menu/auth-nav-menu.component';
import { fadeInOut, fadeOut } from '../../../../../app/shared/animations/fade';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../../app/app.reducer';
import { HostWindowService } from '../../../../../app/shared/host-window.service';
import { AuthService } from '../../../../../app/core/auth/auth.service';
import { DSONameService } from '../../../../../app/core/breadcrumbs/dso-name.service';
import { Observable } from 'rxjs';
import { EPerson } from '../../../../../app/core/eperson/models/eperson.model';

/**
 * Component representing the {@link AuthNavMenuComponent} of a page
 */
@Component({
  selector: 'ds-auth-nav-menu',
  templateUrl: './auth-nav-menu.component.html',
  styleUrls: ['./auth-nav-menu.component.scss', '../../../../../app/shared/auth-nav-menu/auth-nav-menu.component.scss'],
  animations: [fadeInOut, fadeOut]
})
export class AuthNavMenuComponent extends BaseComponent implements OnInit {

  /**
   * The authenticated user.
   * @type {Observable<EPerson>}
   */
  public user$: Observable<EPerson>;

  constructor(
    protected store: Store<AppState>,
    protected windowService: HostWindowService,
    protected authService: AuthService,
    public dsoNameService: DSONameService,
  ) {
    super(store, windowService, authService);
  }

  ngOnInit() {
    super.ngOnInit();
    this.user$ = this.authService.getAuthenticatedUserFromStore();
  }
}
