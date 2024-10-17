import { Component, OnInit } from "@angular/core";
import { hasValue } from "src/app/shared/empty.util";
import { StatusBadgeComponent as BaseComponent } from "src/app/shared/object-collection/shared/badges/status-badge/status-badge.component";

@Component({
    selector: 'ds-status-badge',
    templateUrl: './status-badge.component.html',
    styleUrls: ['./status-badge.component.scss']
})
export class StatusBadgeComponent extends BaseComponent implements OnInit {
    /**
     * If a change was requested by a manager for the submitter.
     */
    isChangeRequested = false;

    ngOnInit(): void {
        let objectAsAny = this.object as any;
        if (hasValue(objectAsAny.indexableObject)) {
            objectAsAny = objectAsAny.indexableObject;
        }
        const objectExists = hasValue(objectAsAny);
        this.privateBadge = objectExists && hasValue(objectAsAny.isDiscoverable) && !objectAsAny.isDiscoverable;
        this.withdrawnBadge = objectExists && hasValue(objectAsAny.isWithdrawn) && objectAsAny.isWithdrawn;
        this.isChangeRequested = objectExists && hasValue(objectAsAny.isChangeRequested) && objectAsAny.isChangeRequested;
    }
}