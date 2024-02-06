import { AsyncPipe, NgClass, NgIf, NgStyle, NgTemplateOutlet } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { CountersSectionComponent as BaseComponent } from 'src/app/shared/explore/section-component/counters-section/counters-section.component';
import { ThemedLoadingComponent } from 'src/app/shared/loading/themed-loading.component';

@Component({
    selector: 'ds-themed-counters-section',
    templateUrl: 'counters-section.component.html',
    styleUrls: ['counters-section.component.scss'],
    imports: [
        AsyncPipe,
        NgIf,
        NgTemplateOutlet,
        TranslateModule,
        NgClass,
        NgStyle,
        RouterLink,
        ThemedLoadingComponent,
    ],
    standalone: true,
})
export class CountersSectionComponent extends BaseComponent {}
