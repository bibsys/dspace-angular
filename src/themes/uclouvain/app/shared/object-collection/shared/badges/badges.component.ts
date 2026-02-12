import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Item } from 'src/app/core/shared/item.model';
import { getFirstSucceededRemoteDataWithNotEmptyPayload } from 'src/app/core/shared/operators';
import { AccessConditionObject } from 'src/app/core/submission/models/access-condition.model';
import { AccessStatusObject } from 'src/app/shared/object-collection/shared/badges/access-status-badge/access-status.model';
import { BadgesComponent as BaseComponent } from 'src/app/shared/object-collection/shared/badges/badges.component';
import { ThemedMyDSpaceStatusBadgeComponent } from 'src/app/shared/object-collection/shared/badges/my-dspace-status-badge/themed-my-dspace-status-badge.component';
import { CustomTypeBadgeComponent } from 'src/themes/uclouvain/app/entity-groups/publication-entity/search-result-list-elements/custom-type-badge/custom-type-badge.component';
import { Context } from '../../../../../../../app/core/shared/context.model';
import { AccessConditionsComponent } from '../../../access-conditions/access-conditions.component';

@Component({
    selector: 'ds-themed-badges',
    styleUrls: ['../../../../../../../app/shared/object-collection/shared/badges/badges.component.scss'],
    template: `<div class="d-flex flex-row align-items-center gapx-1">
        <div class="d-flex flex-grow-1">
            <ds-custom-type-badge [object]="object" [displayEntityType]="displayType" customStyle="mr-2" />
            <ng-container *ngIf="isMyDSpaceStatus">
                <ds-my-dspace-status-badge [context]="context"></ds-my-dspace-status-badge>
            </ng-container>
        </div> 
        <ng-container *ngIf="showAccessStatus && accessCondition && accessCondition.name !== 'unknown'">
            <ds-access-conditions [accessConditions]="[accessCondition]"></ds-access-conditions>
        </ng-container>
    </div>`,
    standalone: true,
    imports: [
        CustomTypeBadgeComponent,
        NgIf,
        ThemedMyDSpaceStatusBadgeComponent,
        AccessConditionsComponent,
    ],
})
export class BadgesComponent extends BaseComponent implements OnInit {
    protected accessCondition: AccessConditionObject;

    ngOnInit() {
      if (this.object instanceof Item) {
        const item = this.object as Item;
        if (item.isWithdrawn) {
          this.context = Context.MyDSpaceWithdrawn;
        }
        if (this.showAccessStatus) {
          if (item.accessStatus) {
            item.accessStatus
              .pipe(getFirstSucceededRemoteDataWithNotEmptyPayload())
              .subscribe((access: AccessStatusObject) =>
                this.accessCondition = Object.assign(new AccessConditionObject(), {id: 0, name: access.status}
              )
            );
          }
        }
      }
    }
}
