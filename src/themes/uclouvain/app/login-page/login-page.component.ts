import { Component } from '@angular/core';
import { LoginPageComponent as BaseComponent } from 'src/app/login-page/login-page.component';

@Component({
    selector: 'ds-login-page',
    templateUrl: 'login-page.component.html',
    styleUrls: ['login-page.component.scss']
})
export class LoginPageComponent extends BaseComponent {}
