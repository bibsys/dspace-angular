import { Component, Input, OnInit } from '@angular/core';
import { Item } from 'src/app/core/shared/item.model';
import { getFirstSucceededRemoteDataWithNotEmptyPayload } from 'src/app/core/shared/operators';
import { AccessConditionObject } from 'src/app/core/submission/models/access-condition.model';
import { AccessStatusObject } from 'src/app/shared/object-collection/shared/badges/access-status-badge/access-status.model';
import { BadgesComponent as BaseComponent } from 'src/app/shared/object-collection/shared/badges/badges.component';

@Component({
    selector: 'ds-badges',
    styleUrls: ['../../../../../../../app/shared/object-collection/shared/badges/badges.component.scss'],
    template: `<div class="d-flex flex-row align-items-center gapx-1">
        <div class="d-flex flex-grow-1 gapx-2">
            <ds-custom-type-badge [object]="object" [displayEntityType]="displayType" />
            <ng-container *ngIf="isMyDSpaceStatus">
                <ds-themed-my-dspace-status-badge [context]="context"></ds-themed-my-dspace-status-badge>
            </ng-container>
        </div> 
        <ng-container *ngIf="showAccessStatus && accessCondition && accessCondition.name !== 'unknown'">
            <ds-access-conditions [accessConditions]="[accessCondition]"></ds-access-conditions>
        </ng-container>
    </div>`,
})
export class BadgesComponent extends BaseComponent implements OnInit {
    protected accessCondition: AccessConditionObject;

    ngOnInit() {
        if (this.showAccessStatus && this.object instanceof Item) {
            let item = this.object as Item;
            if (item.accessStatus) {
                item.accessStatus.pipe(
                    getFirstSucceededRemoteDataWithNotEmptyPayload()
                ).subscribe((access: AccessStatusObject) =>
                    this.accessCondition = Object.assign(new AccessConditionObject(), {id: 0, name: access.status})
                );
            }
        }
    }
}
