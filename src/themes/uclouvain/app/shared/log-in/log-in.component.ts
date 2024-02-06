import { Component } from '@angular/core';
import { LogInComponent as BaseComponent } from 'src/app/shared/log-in/log-in.component';

@Component({
    selector: 'ds-log-in',
    templateUrl: './log-in.component.html',
    styleUrls: ['../../../../../app/shared/log-in/log-in.component.scss'],
})
export class LogInComponent extends BaseComponent {}
