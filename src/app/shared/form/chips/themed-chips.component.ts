import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ThemedComponent } from '../../theme-support/themed.component';
import { ChipsComponent } from './chips.component';
import { Chips } from './models/chips.model';

@Component({
    selector: 'ds-themed-chips',
    templateUrl: '../../theme-support/themed.component.html'
})
export class ThemedChipsComponent extends ThemedComponent<ChipsComponent> {
    @Input() chips: Chips;
    @Input() wrapperClass: string;
    @Input() editable = false;
    @Input() showIcons = false;
    @Input() clickable = true;

    @Output() selected: EventEmitter<number> = new EventEmitter<number>();
    @Output() remove: EventEmitter<number> = new EventEmitter<number>();
    @Output() change: EventEmitter<any> = new EventEmitter<any>();

    protected inAndOutputNames: (keyof ChipsComponent & keyof this)[] = [
        'chips',
        'wrapperClass',
        'editable',
        'showIcons',
        'clickable',
        'selected',
        'remove',
        'change'
    ];

    protected getComponentName(): string {
        return 'ChipsComponent';
    }

    protected importThemedComponent(themeName: string): Promise<any> {
        return import(`../../../../themes/${themeName}/app/shared/form/chips/chips.component`);
    }

    protected importUnthemedComponent(): Promise<any> {
        return import(`./chips.component`);
    }
}
