import { AsyncPipe, DatePipe, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { BehaviorSubject, merge, Subject } from 'rxjs';
import { filter, first } from 'rxjs/operators';
import { RoleService } from '../../../../../../../app/core/roles/role.service';
import { Context } from '../../../../../../../app/core/shared/context.model';
import { ViewMode } from '../../../../../../../app/core/shared/view-mode.model';
import { GenericItemPageFieldComponent } from '../../../../../../../app/item-page/simple/field-components/specific-field/generic/generic-item-page-field.component';
import { listableMetadataBlockComponent } from '../listable-metadata-block.decorator';
import { AbstractMetadataBlockComponent } from './abstract-metadata-block.component';

@listableMetadataBlockComponent('*', ViewMode.StandalonePage, Context.Any, '*', Number.MAX_SAFE_INTEGER)
@Component({
  template: `
      <div class="align-self-end" *ngIf="canViewMetadata$ | async">
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
        <ng-container *ngIf="archivedDate">
          <dt>{{ 'item.page.details.label.created-date' | translate }}</dt>
          <dd>
            <div class="datetime date">{{ archivedDate | date:dateFormat }}</div>
            <div class="datetime time">{{ archivedDate | date:hourFormat}}</div>
          </dd>
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

  protected canViewMetadata$: Subject<boolean> = new BehaviorSubject(false);
  protected archivedDate: string = null;
  protected dateFormat = "yyyy-MM-dd";
  protected hourFormat = "HH:mm:ss.SSS zzzz";

  private conditions = [
    this.roleService.isAdmin(),
    this.roleService.isController()
  ];

  constructor(
    private roleService: RoleService,
  ) {
    super();
  }

  ngOnInit() {
    this.archivedDate = this.item.firstMetadataValue("dc.date.available");
    // We want call all condition in parallel mode.
    // When a condition return `true`, no need to continue waiting other response.
    merge(...this.conditions)
      .pipe(
        filter(r => r === true),
        first()
      )
      .subscribe(() => this.canViewMetadata$.next(true));
  }
}