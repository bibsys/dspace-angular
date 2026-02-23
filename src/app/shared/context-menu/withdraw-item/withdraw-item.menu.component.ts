import { Component, Inject, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject } from 'rxjs';
import { take } from 'rxjs/operators';
import { ItemDataService } from '../../../core/data/item-data.service';
import { RemoteData } from '../../../core/data/remote-data';
import { DSpaceObjectType } from '../../../core/shared/dspace-object-type.model';
import { Item } from '../../../core/shared/item.model';
import { getFirstCompletedRemoteData } from '../../../core/shared/operators';
import { NotificationsService } from '../../notifications/notifications.service';
import { ContextMenuEntryComponent } from '../context-menu-entry.component';
import { DSpaceObject } from '../../../core/shared/dspace-object.model';
import { AuthorizationDataService } from '../../../core/data/feature-authorization/authorization-data.service';
import { FeatureID } from '../../../core/data/feature-authorization/feature-id';
import { ContextMenuEntryType } from '../context-menu-entry-type';
import { AsyncPipe, NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

/**
 * This component renders a context menu option to withdraw an item.
 */
@Component({
  selector: 'ds-context-menu-withdraw-item',
  templateUrl: './withdraw-item-menu.component.html',
  imports: [NgIf, TranslateModule, AsyncPipe],
  standalone: true,
})
export class WithdrawItemMenuComponent extends ContextMenuEntryComponent implements OnInit {

  public isAuthorized: BehaviorSubject<boolean> =  new BehaviorSubject<boolean>(false);
  protected item: Item;
  private isWithdrawn: boolean; // temp attribute because `item.isWithdrawn` is readonly

  constructor(
    @Inject('contextMenuObjectProvider') protected injectedContextMenuObject: DSpaceObject,
    @Inject('contextMenuObjectTypeProvider') protected injectedContextMenuObjectType: DSpaceObjectType,
    private authorizationService: AuthorizationDataService,
    private modalService: NgbModal,
    private itemDataService: ItemDataService,
    private router: Router,
    protected translate: TranslateService,
    protected notificationsService: NotificationsService,
  ) {
    super(injectedContextMenuObject, injectedContextMenuObjectType, ContextMenuEntryType.Audit);
  }

  ngOnInit(): void {
    if (this.contextMenuObjectType === DSpaceObjectType.ITEM) {
      this.item = this.contextMenuObject as Item;
      this.isWithdrawn = this.item.isWithdrawn;
      const featureID = (this.isWithdrawn) ? FeatureID.ReinstateItem : FeatureID.WithdrawItem;
      this.authorizationService
        .isAuthorized(featureID, this.contextMenuObject.self, undefined, false)
        .pipe(take(1))
        .subscribe((isAuthorized: boolean) => this.isAuthorized.next(isAuthorized));
    }
  }

  /**
   * Open a confirmation modal box
   * @param content model template to use
   */
  confirmWithdrawn(content: any) {
    this.modalService.open(content).result.then(
      (result) => {
        if (result === 'confirm') {
          this.toggleWithdrawn();
        }
      },
      () => { /* user choose 'cancel' or click outside modal --> do nothing*/ }
    );
  }

  private toggleWithdrawn() {
    const nextState = !this.isWithdrawn;
    this.itemDataService.setWithDrawn(this.item, nextState)
      .pipe(
        getFirstCompletedRemoteData(),
        take(1)
      )
      .subscribe((response: RemoteData<Item>) => {
        if (response.hasSucceeded) {
          this.isWithdrawn = nextState;
          const state = (this.item.isWithdrawn) ? "withdraw" : "reinstate";
          this.notificationsService.success(this.translate.get('item.edit.'+ state + '.success'));

          const currentUrl = this.router.url;
          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
            this.router.navigate([currentUrl]);
          });
        } else {
          this.notificationsService.error(this.translate.get('withdraw-item.notification.error'));
        }
      });
  }
}
