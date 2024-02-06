import { Component } from '@angular/core';
import { NavbarComponent as BaseComponent } from '../../../../app/navbar/navbar.component';
import { slideMobileNav } from '../../../../app/shared/animations/slide';
import { AsyncPipe, NgClass, NgComponentOutlet, NgFor, NgIf } from '@angular/common';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { ThemedUserMenuComponent } from 'src/app/shared/auth-nav-menu/user-menu/themed-user-menu.component';
import { TranslateModule } from '@ngx-translate/core';
import { ThemedSearchNavbarComponent } from 'src/app/search-navbar/themed-search-navbar.component';
import { ThemedLangSwitchComponent } from 'src/app/shared/lang-switch/themed-lang-switch.component';
import { ContextHelpToggleComponent } from 'src/app/header/context-help-toggle/context-help-toggle.component';
import { ThemedAuthNavMenuComponent } from 'src/app/shared/auth-nav-menu/themed-auth-nav-menu.component';
import { ImpersonateNavbarComponent } from 'src/app/shared/impersonate-navbar/impersonate-navbar.component';
import { RouterLink } from '@angular/router';

/**
 * Component representing the public navbar
 */
@Component({
  selector: 'ds-themed-navbar',
  styleUrls: ['./navbar.component.scss'],
  templateUrl: './navbar.component.html',
  animations: [slideMobileNav],
  imports: [
    NgbDropdownModule,
    NgClass,
    NgIf,
    NgFor,
    NgComponentOutlet,
    AsyncPipe,
    RouterLink,
    TranslateModule,
    ThemedSearchNavbarComponent,
    ThemedUserMenuComponent,
    ThemedLangSwitchComponent,
    ContextHelpToggleComponent,
    ThemedAuthNavMenuComponent,
    ImpersonateNavbarComponent,
  ],
  standalone: true,
})
export class NavbarComponent extends BaseComponent {
}