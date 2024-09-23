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
import { AsyncPipe, NgClass, NgIf } from '@angular/common';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { ThemedLogInComponent } from 'src/app/shared/log-in/themed-log-in.component';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ThemedUserMenuComponent } from 'src/app/shared/auth-nav-menu/user-menu/themed-user-menu.component';
import { TranslateModule } from '@ngx-translate/core';
import { BrowserOnlyPipe } from 'src/app/shared/utils/browser-only.pipe';

/**
 * Component representing the {@link AuthNavMenuComponent} of a page
 */
@Component({
  selector: 'ds-themed-auth-nav-menu',
  templateUrl: './auth-nav-menu.component.html',
  styleUrls: ['./auth-nav-menu.component.scss', '../../../../../app/shared/auth-nav-menu/auth-nav-menu.component.scss'],
  animations: [fadeInOut, fadeOut],
  imports: [
    NgClass,
    NgIf,
    NgbDropdownModule,
    ThemedLogInComponent,
    RouterLink,
    RouterLinkActive,
    ThemedUserMenuComponent,
    AsyncPipe,
    TranslateModule,
    BrowserOnlyPipe,
  ],
  standalone: true,
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
