import {
  AsyncPipe,
  NgClass,
  NgIf,
} from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import {
  RouterLink,
  RouterLinkActive,
} from '@angular/router';
import {
  select,
  Store,
} from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
import { BehaviorSubject, filter, map, mergeMap, Observable, Subject, switchMap } from 'rxjs';

import { AppState } from '../../../app.reducer';
import {
  getProfileModuleRoute,
  getSubscriptionsModuleRoute,
} from '../../../app-routing-paths';
import { AuthService } from '../../../core/auth/auth.service';
import { isAuthenticationLoading } from '../../../core/auth/selectors';
import { DSONameService } from '../../../core/breadcrumbs/dso-name.service';
import { EPerson } from '../../../core/eperson/models/eperson.model';
import { RoleService } from '../../../core/roles/role.service';
import { MYDSPACE_ROUTE } from '../../../my-dspace-page/my-dspace-route';
import { getProcessListRoute } from '../../../process-page/process-page-routing.paths';
import { ThemedLoadingComponent } from '../../loading/themed-loading.component';
import { LogOutComponent } from '../../log-out/log-out.component';
import { isNotEmpty } from '../../empty.util';
import { getAllCompletedRemoteData, getRemoteDataPayload } from 'src/app/core/shared/operators';
import { ResearcherProfileDataService } from 'src/app/core/profile/researcher-profile-data.service';
import { followLink } from '../../utils/follow-link-config.model';

/**
 * This component represents the user nav menu.
 */
@Component({
  selector: 'ds-base-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss'],
  standalone: true,
  imports: [NgIf, ThemedLoadingComponent, RouterLinkActive, NgClass, RouterLink, LogOutComponent, AsyncPipe, TranslateModule],
})
export class UserMenuComponent implements OnInit {

  /**
   * The input flag to show user details in navbar expandable menu
   */
  @Input() inExpandableNavbar = false;

  /**
   * Emits an event when the route changes
   */
  @Output() changedRoute: EventEmitter<any> = new EventEmitter<any>();

  /**
   * True if the authentication is loading.
   * @type {Observable<boolean>}
   */
  public loading$: Observable<boolean>;

  /**
   * The authenticated user.
   * @type {Observable<EPerson>}
   */
  public user$: Observable<EPerson>;

  /**
   * Is the authenticated user is admin ?
   */
  public isAdmin$: Subject<boolean> = new BehaviorSubject<boolean>(false);

  /**
   * The mydspace page route.
   * @type {string}
   */
  public mydspaceRoute = MYDSPACE_ROUTE;

  /**
   * The profile page route
   */
  public profileRoute: string;

  /**
   * The my account route (old profile page route).
   */
  public myAccountRoute = getProfileModuleRoute();

  /**
   * The processes page route
   */
  public processesRoute = getProcessListRoute();

  /**
   * The profile page route
   */
  public subscriptionsRoute = getSubscriptionsModuleRoute();

  protected readonly isNotEmpty = isNotEmpty;

  constructor(
    protected store: Store<AppState>,
    protected authService: AuthService,
    protected researcherProfileService: ResearcherProfileDataService,
    public dsoNameService: DSONameService,
    protected roleService: RoleService,
  ) {
  }

  /**
   * Initialize all instance variables
   */
  ngOnInit(): void {

    // set loading
    this.loading$ = this.store.pipe(select(isAuthenticationLoading));

    // set user
    this.user$ = this.authService.getAuthenticatedUserFromStore();

    // Retrieve potential profile id using user id.
    this.user$.pipe(
      filter(isNotEmpty),
      switchMap(
        user => this.researcherProfileService.findById(user.id, false, true, followLink('item')).pipe(
          getAllCompletedRemoteData(),
          getRemoteDataPayload(),
          filter(isNotEmpty),
          switchMap((researcherProfile) => this.researcherProfileService.findRelatedItemId(researcherProfile))
        )
      ),
      filter(isNotEmpty),
    ).subscribe((profileId: String) => {
      this.roleService.isAdmin().subscribe(isAdmin => this.isAdmin$.next(isAdmin));
      this.profileRoute = "/entities/person/" + profileId;
    })
  }

  /**
   * Emits an event when the menu item is clicked
   */
  onMenuItemClick() {
    this.changedRoute.emit();
  }
}
