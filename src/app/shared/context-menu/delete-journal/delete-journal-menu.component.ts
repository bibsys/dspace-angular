import { Component, Inject, OnDestroy, OnInit } from "@angular/core";
import { ContextMenuEntryComponent } from "../context-menu-entry.component";
import { DSpaceObject } from "src/app/core/shared/dspace-object.model";
import { DSpaceObjectType } from "src/app/core/shared/dspace-object-type.model";
import { RoleService } from "src/app/core/roles/role.service";
import { ContextMenuEntryType } from "../context-menu-entry-type";
import { AuthorizationDataService } from "src/app/core/data/feature-authorization/authorization-data.service";
import { BehaviorSubject, combineLatest, map, Observable, of, Subscription, tap } from "rxjs";
import { FeatureID } from "src/app/core/data/feature-authorization/feature-id";
import { TranslateModule, TranslateService } from "@ngx-translate/core";
import { AsyncPipe, NgIf } from "@angular/common";
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { ItemDataService } from "src/app/core/data/item-data.service";
import { getFirstCompletedRemoteData } from "src/app/core/shared/operators";
import { NoContent } from "src/app/core/shared/NoContent.model";
import { RemoteData } from "src/app/core/data/remote-data";
import { NotificationsService } from "../../notifications/notifications.service";
import { Router } from "@angular/router";
import { isNotEmpty } from "../../empty.util";
import { Item } from "src/app/core/shared/item.model";

/**
 * Component to display a context menu entry to delete a journal object.
 * 
 * @author Michaël Pourbaix <michael.pourbaix@uclouvain.be>
 */
@Component({
  selector: 'ds-delete-journal-menu',
  templateUrl: './delete-journal-menu.component.html',
  standalone: true,
  imports: [TranslateModule, NgIf, AsyncPipe],
})
export class DeleteJournalMenuComponent extends ContextMenuEntryComponent implements OnInit, OnDestroy {

  private subscription = new Subscription();
  protected isAuthorized$: Observable<boolean> = of(false);
  protected modalRef: NgbModalRef; 
  protected processing$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(
    @Inject('contextMenuObjectProvider') protected injectedContextMenuObject: DSpaceObject,
    @Inject('contextMenuObjectTypeProvider') protected injectedContextMenuObjectType: DSpaceObjectType,
    protected roleService: RoleService,
    protected authorizationService: AuthorizationDataService,
    protected modalService: NgbModal,
    protected itemService: ItemDataService,
    protected notificationsService: NotificationsService,
    protected router: Router,
    protected translateService: TranslateService,
  ) {
    super(injectedContextMenuObject, injectedContextMenuObjectType, ContextMenuEntryType.DeleteJournal);
  }

  ngOnInit(): void {
    // Check for permission to delete a journal
    if (isNotEmpty(this.contextMenuObject) && (this.contextMenuObject instanceof Item)) {
      this.isAuthorized$ = combineLatest([
        this.isObjectValid(),
        this.authorizationService.isAuthorized(FeatureID.CanDelete, this.contextMenuObject.self, undefined, false)
      ]).pipe(
        map(([valid, authorized]: [boolean, boolean]) => valid && authorized)
      );
    }
  }

  /**
   * Checks that the object is an item and that the entity type is 'Journal'. 
   * @returns True if Item of type Journal, false otherwise.
   */
  isObjectValid(): Observable<boolean> {
    if (isNotEmpty(this.contextMenuObject) && (this.contextMenuObject instanceof Item)) {
      let item = (this.contextMenuObject) as Item;
      if (item?.entityType === "Journal") {
        return of(true);
      }
    }
    return of(false);
  }

  openConfirmModal(content: any): void {
    this.modalRef = this.modalService.open(content);
  }

  closeConfirmModal(): void {
    this.modalRef.close();
  }

  deleteJournal(): void {
    // Toggle loading state.
    this.processing$.next(true);
    this.subscription = this.itemService.delete(this.contextMenuObject.id).pipe(
      getFirstCompletedRemoteData(),
      // Disable loading state.
      tap(() => this.processing$.next(false)),
      tap(response => this.handleResponse(response)),
    ).subscribe();
  }

  handleResponse(response: RemoteData<NoContent>) {
    if (response.hasSucceeded) {
      this.closeConfirmModal();
      this.notificationsService.success(this.translateService.get("item.journal.deleted.success"));
      // TODO: Maybe there is a better way to navigate to the desired page ?
      this.router.navigateByUrl("/search?configuration=journals");
    } else {
      this.notificationsService.error(this.translateService.get("item.journal.deleted.error"));
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}