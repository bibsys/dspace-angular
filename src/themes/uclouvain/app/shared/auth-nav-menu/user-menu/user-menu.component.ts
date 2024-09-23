import { Component } from '@angular/core';
import { UserMenuComponent as BaseComponent } from '../../../../../../app/shared/auth-nav-menu/user-menu/user-menu.component';

/**
 * Component representing the {@link UserMenuComponent} of a page
 */
@Component({
  selector: 'ds-user-menu',
  templateUrl: '../../../../../../app/shared/auth-nav-menu/user-menu/user-menu.component.html',
  styleUrls: ['../../../../../../app/shared/auth-nav-menu/user-menu/user-menu.component.scss'],
})
export class UserMenuComponent extends BaseComponent {
}
