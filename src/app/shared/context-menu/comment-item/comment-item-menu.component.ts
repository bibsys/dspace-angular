import {
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { take } from 'rxjs/operators';
import { DSpaceObjectType } from '../../../core/shared/dspace-object-type.model';
import { ContextMenuEntryComponent } from '../context-menu-entry.component';
import { DSpaceObject } from '../../../core/shared/dspace-object.model';
import { AuthorizationDataService } from '../../../core/data/feature-authorization/authorization-data.service';
import { FeatureID } from '../../../core/data/feature-authorization/feature-id';
import { ContextMenuEntryType } from '../context-menu-entry-type';
import { AsyncPipe, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

/**
 * This component renders a context menu option for list comments on an item.
 */
@Component({
  selector: 'ds-context-menu-comment-item',
  templateUrl: './comment-item-menu.component.html',
  imports: [NgIf, RouterLink, TranslateModule, AsyncPipe],
  standalone: true,
})
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
