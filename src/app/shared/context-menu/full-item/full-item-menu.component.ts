import {
  Component,
  Inject, OnDestroy, OnInit,
} from '@angular/core';
import { Router } from '@angular/router';

import { DSpaceObject } from '../../../core/shared/dspace-object.model';
import { DSpaceObjectType } from '../../../core/shared/dspace-object-type.model';
import { Item } from '../../../core/shared/item.model';
import { getItemFullPageRoute } from '../../../item-page/item-page-routing-paths';
import { rendersContextMenuEntriesForType } from '../context-menu.decorator';
import { ContextMenuEntryComponent } from '../context-menu-entry.component';
import { ContextMenuEntryType } from '../context-menu-entry-type';
import { Observable, Subscription } from 'rxjs';
import { AuthorizationDataService } from '../../../core/data/feature-authorization/authorization-data.service';
import { NotificationsService } from '../../notifications/notifications.service';
import { FeatureID } from '../../../core/data/feature-authorization/feature-id';

/**
 * This component renders a context menu option that provides to export an item.
 */
@Component({
  selector: 'ds-context-menu-full-item',
  templateUrl: './full-item-menu.component.html',
})
@rendersContextMenuEntriesForType(DSpaceObjectType.ITEM)
export class FullItemMenuComponent extends ContextMenuEntryComponent implements OnInit, OnDestroy {

  // Is the user allowed to navigate to the full item page of the object ??
  isAuthorized$: Observable<boolean>;
  private subscription = new Subscription();

  constructor(
    @Inject('contextMenuObjectProvider') protected injectedContextMenuObject: DSpaceObject,
    @Inject('contextMenuObjectTypeProvider') protected injectedContextMenuObjectType: DSpaceObjectType,
    private router: Router,
    private authorizationService: AuthorizationDataService,
    private notificationService: NotificationsService,
  ) {
    super(injectedContextMenuObject, injectedContextMenuObjectType, ContextMenuEntryType.FullItem);
  }

  // On initialization of the component, check for the user's authorization to see the full item
  ngOnInit(): void {
    this.subscription.add(this.notificationService.claimedProfile.subscribe(() => {
      this.isAuthorized$ = this.authorizationService.isAuthorized(FeatureID.CanSeeFullItem, this.contextMenuObject.self, undefined, false);
    }));
  }

  getItemFullPageRoute(object: DSpaceObject): string {
    return getItemFullPageRoute(object as Item);
  }

  isSameView(object: DSpaceObject): boolean {
    return this.router.url === getItemFullPageRoute(object as Item);
  }

  // Unsubscribe from observable
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
