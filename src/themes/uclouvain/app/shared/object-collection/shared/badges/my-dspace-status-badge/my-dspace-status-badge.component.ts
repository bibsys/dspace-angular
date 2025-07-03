import { NgIf } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { TranslateModule } from "@ngx-translate/core";
import { Context } from "src/app/core/shared/context.model";
import { MyDSpaceStatusBadgeComponent as BaseComponent } from "src/app/shared/object-collection/shared/badges/my-dspace-status-badge/my-dspace-status-badge.component";


@Component({
    selector: 'ds-themed-my-dspace-status-badge',
    styleUrls: ['./my-dspace-status-badge.component.scss'],
    template: `
        <div>
            <span [className]="badgeClass" class="py-1 px-2">
                <i *ngIf="badgeLogo" [className]="badgeLogo"></i>
                {{('mydspace.status.' + badgeContent) | translate}}
            </span>
        </div>
    `,
    standalone: true,
    imports: [
      NgIf,
      TranslateModule,
    ],
  })
  export class MyDSpaceStatusBadgeComponent extends BaseComponent implements OnInit {
    protected badgeLogo: string;
    
    ngOnInit() {
        this.badgeContent = this.context;
        this.badgeClass = 'badge py-1 px-2 ';
        switch (this.context) {
          case Context.MyDSpaceValidation:
            this.badgeClass += 'badge-validation';
            this.badgeLogo = 'fa-solid fa-list-check';
            break;
          case Context.MyDSpaceWaitingController:
            this.badgeClass += 'badge-waiting-controller';
            this.badgeLogo = 'fa-solid fa-clock';
            break;
          case Context.MyDSpaceWorkspace:
            this.badgeClass += 'badge-workspace';
            this.badgeLogo = 'fa-solid fa-pen';
            break;
          case Context.MyDSpaceArchived:
            this.badgeClass += 'badge-archived';
            this.badgeLogo = 'fa-solid fa-box-archive';
            break;
          case Context.MyDSpaceWorkflow:
            this.badgeClass += 'badge-workflow';
            this.badgeLogo = 'fa-solid fa-clock';
            break;
        }
      }
  }
  