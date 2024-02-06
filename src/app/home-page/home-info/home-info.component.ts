import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'ds-home-info',
    styleUrls: ['./home-info.component.scss'],
    templateUrl: './home-info.component.html',
    imports: [TranslateModule],
    standalone: true,
})
export class HomeInfoComponent {}
