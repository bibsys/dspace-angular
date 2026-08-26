import {
  Observable,
  of as observableOf,
} from 'rxjs';
import {AsyncPipe, NgClass, NgIf} from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DSpaceObjectType } from '../../../core/shared/dspace-object-type.model';
import { DSpaceObject } from '../../../core/shared/dspace-object.model';
import { ContextMenuEntryType } from '../context-menu-entry-type';
import { ContextMenuEntryComponent } from '../context-menu-entry.component';
import {TranslateModule} from "@ngx-translate/core";
import {ItemVersionsComponent} from "../../../../themes/uclouvain/app/item-page/versions/item-versions.component";
import {FeatureID} from "../../../core/data/feature-authorization/feature-id";
import {AuthorizationDataService} from "../../../core/data/feature-authorization/authorization-data.service";

@Component({
  selector: 'ds-version-history-item-menu',
  template: `
      <button
        *ngIf="isAuthorized$ | async"
        class="btn btn-primary"
        (click)="$event.preventDefault(); openVersionHistoryModal();"
      >
        {{ "item.version.history.head" | translate }}
      </button>
  `,
  imports: [NgIf, NgClass, TranslateModule, AsyncPipe],
  standalone: true
})
export class VersionHistoryItemMenuComponent extends ContextMenuEntryComponent implements OnInit {

  /**
   * Whether or not the current user is authorized to version history the DSpaceObject
   */
  isAuthorized$: Observable<boolean> = observableOf(false);

  constructor(
    @Inject('contextMenuObjectProvider') protected injectedContextMenuObject: DSpaceObject,
    @Inject('contextMenuObjectTypeProvider') protected injectedContextMenuObjectType: DSpaceObjectType,
    protected authorizationService: AuthorizationDataService,
    private modalService: NgbModal,
  ) {
    super(injectedContextMenuObject, injectedContextMenuObjectType, ContextMenuEntryType.VersionHistoryItem);
  }

  ngOnInit() {
    this.isAuthorized$ = this.authorizationService.isAuthorized(FeatureID.CanSeeVersions, this.contextMenuObject.self);
  }

  /** Open the Version History modal */
  openVersionHistoryModal() {
    if (this.contextMenuObject) {
      const modalRef = this.modalService.open(ItemVersionsComponent, { size: 'lg', backdrop: 'static' });
      modalRef.componentInstance.item = this.contextMenuObject;
      modalRef.componentInstance.displayTitle = false;
      modalRef.componentInstance.displayWhenEmpty = true;
    }
  }
}
