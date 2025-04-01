import {
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { take } from 'rxjs/operators';
import { DSpaceObjectType } from '../../../../../../app/core/shared/dspace-object-type.model';
import { rendersContextMenuEntriesForType } from '../../../../../../app/shared/context-menu/context-menu.decorator';
import { ContextMenuEntryComponent } from '../../../../../../app/shared/context-menu/context-menu-entry.component';
import { DSpaceObject } from '../../../../../../app/core/shared/dspace-object.model';
import { AuthorizationDataService } from '../../../../../../app/core/data/feature-authorization/authorization-data.service';
import { FeatureID } from '../../../../../../app/core/data/feature-authorization/feature-id';
import { ContextMenuEntryType } from '../../../../../../app/shared/context-menu/context-menu-entry-type';

/**
 * This component renders a context menu option for list comments on an item.
 */
@Component({
  selector: 'ds-context-menu-comment-item',
  templateUrl: './comment-item-menu.component.html',
})
@rendersContextMenuEntriesForType(DSpaceObjectType.ITEM)
export class CommentItemMenuComponent extends ContextMenuEntryComponent implements OnInit {

  public isAuthorized: BehaviorSubject<boolean> =  new BehaviorSubject<boolean>(false);

  constructor(
    @Inject('contextMenuObjectProvider') protected injectedContextMenuObject: DSpaceObject,
    @Inject('contextMenuObjectTypeProvider') protected injectedContextMenuObjectType: DSpaceObjectType,
    private authorizationService: AuthorizationDataService,
  ) {
    super(injectedContextMenuObject, injectedContextMenuObjectType, ContextMenuEntryType.Audit);
  }

  ngOnInit(): void {
    this.authorizationService
      .isAuthorized(FeatureID.CanSeeComment, this.contextMenuObject.self, undefined, false)
      .pipe(take(1))
      .subscribe((isAuthorized: boolean) => (this.isAuthorized.next(isAuthorized)));
  }
}
