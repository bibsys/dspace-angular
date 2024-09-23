import { Component } from '@angular/core';
import { UserMenuComponent as BaseComponent } from '../../../../../../app/shared/auth-nav-menu/user-menu/user-menu.component';
import { AsyncPipe, NgClass, NgIf } from '@angular/common';
import { ThemedLoadingComponent } from 'src/app/shared/loading/themed-loading.component';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LogOutComponent } from 'src/app/shared/log-out/log-out.component';
import { TranslateModule } from '@ngx-translate/core';

/**
 * Component representing the {@link UserMenuComponent} of a page
 */
@Component({
  selector: 'ds-themed-user-menu',
  templateUrl: '../../../../../../app/shared/auth-nav-menu/user-menu/user-menu.component.html',
  styleUrls: ['../../../../../../app/shared/auth-nav-menu/user-menu/user-menu.component.scss'],
  imports: [
    NgIf,
    ThemedLoadingComponent,
    RouterLinkActive,
    NgClass,
    RouterLink,
    LogOutComponent,
    AsyncPipe,
    TranslateModule,
  ],
  standalone: true,
})
export class UserMenuComponent extends BaseComponent {
}
