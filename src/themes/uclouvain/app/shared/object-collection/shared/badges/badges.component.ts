import { Component } from '@angular/core';
import { BadgesComponent as BaseComponent } from 'src/app/shared/object-collection/shared/badges/badges.component';
import { Context } from 'src/app/core/shared/context.model';
import { ThemedStatusBadgeComponent } from 'src/app/shared/object-collection/shared/badges/status-badge/themed-status-badge.component';
import { ThemedMyDSpaceStatusBadgeComponent } from 'src/app/shared/object-collection/shared/badges/my-dspace-status-badge/themed-my-dspace-status-badge.component';
import { ThemedAccessStatusBadgeComponent } from 'src/app/shared/object-collection/shared/badges/access-status-badge/themed-access-status-badge.component';
import { NgIf } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'ds-themed-badges',
    templateUrl: './badges.component.html',
    imports: [
        ThemedStatusBadgeComponent,
        ThemedMyDSpaceStatusBadgeComponent,
        ThemedAccessStatusBadgeComponent,
        NgIf,
        TranslateModule
    ],
    standalone: true,
})
export class BadgesComponent extends BaseComponent {
    readonly Context = Context
    get isInWorkspace(): boolean {
        return (this.context === Context.MyDSpaceWorkspace);
    }

}
