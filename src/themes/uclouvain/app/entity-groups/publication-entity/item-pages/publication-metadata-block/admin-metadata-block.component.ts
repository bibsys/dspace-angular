import { AsyncPipe, DatePipe, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { BehaviorSubject, combineLatest, merge, Observable, of, shareReplay, Subject } from 'rxjs';
import { filter, first, map, startWith, switchMap } from 'rxjs/operators';
import { AuthService } from '../../../../../../../app/core/auth/auth.service';
import { RemoteData } from '../../../../../../../app/core/data/remote-data';
import { EPerson } from '../../../../../../../app/core/eperson/models/eperson.model';
import { RoleService } from '../../../../../../../app/core/roles/role.service';
import { Context } from '../../../../../../../app/core/shared/context.model';
import { getFirstSucceededRemoteDataPayload } from '../../../../../../../app/core/shared/operators';
import { ViewMode } from '../../../../../../../app/core/shared/view-mode.model';
import { GenericItemPageFieldComponent } from '../../../../../../../app/item-page/simple/field-components/specific-field/generic/generic-item-page-field.component';
import { listableMetadataBlockComponent } from '../listable-metadata-block.decorator';
import { AbstractMetadataBlockComponent } from './abstract-metadata-block.component';

@listableMetadataBlockComponent('*', ViewMode.StandalonePage, Context.Any, '*', Number.MAX_SAFE_INTEGER)
@Component({
  template: `
      <div class="align-self-end" *ngIf="viewData$ | async as data">
          <ng-container *ngIf="data.showGeneral">
            <hr/>
            <ng-container *ngIf="item.hasMetadata('fedora.pid')">
              <dt>{{ 'item.page.details.label.fedora-pid' | translate }}</dt>
              <dd><ds-generic-item-page-field [item]='item' [fields]='["fedora.pid"]'/></dd>
            </ng-container>
            <dt>{{ 'item.page.details.label.last-modified' | translate }}</dt>
            <dd>
              <div class="datetime date">{{ item.lastModified | date:dateFormat }}</div>
              <div class="datetime time">{{ item.lastModified | date:hourFormat}}</div>
            </dd>
          </ng-container>
          <ng-container *ngIf="data.archivedDate">
            <dt>{{ 'item.page.details.label.created-date' | translate }}</dt>
            <dd>
              <div class="datetime date">{{ data.archivedDate | date:dateFormat }}</div>
              <div class="datetime time">{{ data.archivedDate | date:hourFormat}}</div>
            </dd>
          </ng-container>
          <ng-container *ngIf="data.submitter">
            <hr *ngIf="!data.showGeneral"/> 
            <dt>{{ 'item.page.details.label.submitter' | translate }}</dt>
            <dd>{{ data.submitter.email }}</dd>
          </ng-container>
      </div>
  `,
  styles: [
    `.datetime{ color: var(--bs-secondary); }`,
    `.datetime::before { font-family: var(--fa-style-family, "Font Awesome 6 Free"); font-weight: 500; margin-right: 5px; }`,
    `.date::before { content:"\\f073"; }`,
    `.time::before { content:"\\f017"; }`,
  ],
  standalone: true,
  imports: [NgIf, TranslateModule, GenericItemPageFieldComponent, AsyncPipe, DatePipe]
})
export class AdminMetadataBlockComponent extends AbstractMetadataBlockComponent implements OnInit {

  protected viewData$: Observable<{
    showGeneral: boolean,
    submitter: EPerson | null,
    archivedDate: string | null
  } | null>;
  protected dateFormat = "yyyy-MM-dd";
  protected hourFormat = "HH:mm:ss.SSS zzzz";

  constructor(
    private roleService: RoleService,
    private authService: AuthService,
  ) {
    super();
  }

  ngOnInit() {
    const archivedDate = this.item.firstMetadataValue("dc.date.available");

    // Submitter stream
    const submitter$ = (this.item.submitter)
      ? (this.item.submitter instanceof Observable
        ? this.item.submitter.pipe(getFirstSucceededRemoteDataPayload())
        : of(this.item.submitter))
      : of(null);

    // Permissions streams
    const isAdminOrController$ = merge(this.roleService.isAdmin(), this.roleService.isController());
    const isDelegator$ = this.roleService.isDelegator();
    const currentUser$ = this.authService.getAuthenticatedUserFromStore();

    this.viewData$ = combineLatest([
      isAdminOrController$,
      isDelegator$,
      submitter$,
      currentUser$,
    ]).pipe(
      map(([isAdminOrCtrl, isDelegator, submitter, currentUser]) => {
        const isOwner = !!currentUser && !!submitter && currentUser.uuid === submitter.uuid;
        const hasGeneralAccess = isAdminOrCtrl === true;
        const hasSubmitterAccess = (isAdminOrCtrl === true || isDelegator === true || isOwner === true) && !!submitter;
        // If no access at all, return null to hide the entire DIV
        return (!hasGeneralAccess && !hasSubmitterAccess)
          ? null
          : {
            showGeneral: hasGeneralAccess,
            submitter: hasSubmitterAccess ? submitter : null,
            archivedDate: archivedDate
          };
      }),
      startWith(null),
      shareReplay(1)
    );
  }
}