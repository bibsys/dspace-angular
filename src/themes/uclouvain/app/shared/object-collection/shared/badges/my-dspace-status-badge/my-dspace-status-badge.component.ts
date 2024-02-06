import { Component, OnInit } from '@angular/core';
import { MyDSpaceStatusBadgeComponent as BaseComponent } from 'src/app/shared/object-collection/shared/badges/my-dspace-status-badge/my-dspace-status-badge.component';
import { Context } from 'src/app/core/shared/context.model';

@Component({
    selector: 'ds-my-dspace-status-badge',
    templateUrl: './my-dspace-status-badge.component.html'
})
export class MyDSpaceStatusBadgeComponent extends BaseComponent implements OnInit {
    ngOnInit(): void {
        this.badgeContent = this.context;
        this.badgeClass = 'text-light badge ';
        switch (this.context) {
            case Context.MyDSpaceValidation:
              this.badgeClass += 'badge-validation';
              break;
            case Context.MyDSpaceWaitingController:
              this.badgeClass += 'badge-waiting-controller';
              break;
            case Context.MyDSpaceWorkspace:
              this.badgeClass += 'badge-workspace';
              break;
            case Context.MyDSpaceArchived:
              this.badgeClass += 'badge-archived';
              break;
            case Context.MyDSpaceWorkflow:
              this.badgeClass += 'badge-validation';
              break;
        }
    }
}
