import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { LoginPageComponent as BaseComponent } from '../../../../app/login-page/login-page.component';
import { ThemedLogInComponent } from '../../../../app/shared/log-in/themed-log-in.component';

/**
 * This component represents the login page
 */
@Component({
  selector: 'ds-themed-login-page',
  styleUrls: ['./login-page.component.scss'],
  templateUrl: './login-page.component.html',
  standalone: true,
  imports: [
    TranslateModule,
    ThemedLogInComponent
  ]
})
export class LoginPageComponent extends BaseComponent {
}
