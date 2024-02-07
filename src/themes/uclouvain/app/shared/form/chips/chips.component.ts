import { Component } from '@angular/core';
import { ChipsComponent as BaseComponent } from 'src/app/shared/form/chips/chips.component';


@Component({
    selector:'ds-chips',
    templateUrl: './chips.component.html',
    styles: ['.chip-stacked-icons i{color: white !important;}']
})
export class ChipsComponent extends BaseComponent {}
