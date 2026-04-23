import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { LoginPageComponent as BaseComponent } from 'src/app/login-page/login-page.component';
import { ThemedLogInComponent } from 'src/app/shared/log-in/themed-log-in.component';

@Component({
    selector: 'ds-themed-login-page',
    templateUrl: 'login-page.component.html',
    styleUrls: ['login-page.component.scss'],
    imports: [ThemedLogInComponent, TranslateModule],
    standalone: true,
})
export class LoginPageComponent extends BaseComponent {}
