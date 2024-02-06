import { AsyncPipe, LowerCasePipe, NgSwitch, NgSwitchDefault } from '@angular/common';
import { Component } from '@angular/core';
import { BrowseMostElementsComponent as BaseComponent } from 'src/app/shared/browse-most-elements/browse-most-elements.component';
import { ThemedDefaultBrowseElementsComponent } from 'src/app/shared/browse-most-elements/default-browse-elements/themed-default-browse-elements.component';

@Component({
    selector: 'ds-themed-browse-most-elements',
    templateUrl: './browse-most-elements.component.html',
    imports: [
        ThemedDefaultBrowseElementsComponent,
        AsyncPipe,
        LowerCasePipe,
        NgSwitch,
        NgSwitchDefault,
    ],
    standalone: true,
})
export class BrowseMostElementsComponent extends BaseComponent {}
