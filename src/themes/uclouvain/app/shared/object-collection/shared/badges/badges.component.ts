import { Component } from '@angular/core';
import { BadgesComponent as BaseComponent } from 'src/app/shared/object-collection/shared/badges/badges.component';
import { Context } from 'src/app/core/shared/context.model';

@Component({
    selector: 'ds-badges',
    templateUrl: './badges.component.html',
})
export class BadgesComponent extends BaseComponent {
    get isInWorkspace(): boolean {
        return (this.context === Context.MyDSpaceWorkspace);
    }
}
