import { Component, Inject, OnInit, TemplateRef, ViewChild } from "@angular/core";
import { tap } from 'rxjs/operators';
import { AuthorizationDataService } from '../../../core/data/feature-authorization/authorization-data.service';
import { FeatureID } from '../../../core/data/feature-authorization/feature-id';
import { Item } from '../../../core/shared/item.model';
import { ContextMenuEntryComponent } from "../context-menu-entry.component";
import { DSpaceObject } from "src/app/core/shared/dspace-object.model";
import { DSpaceObjectType } from "src/app/core/shared/dspace-object-type.model";
import { ContextMenuEntryType } from "../context-menu-entry-type";
import { environment } from "src/environments/environment";
import { TranslateModule } from "@ngx-translate/core";
import { AsyncPipe, NgFor, NgIf } from "@angular/common";
import { combineLatest, map, Observable, of } from "rxjs";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { isEmpty, isNotEmpty } from "../../empty.util";

/**
 * Component to export a user profile bibliography.
 * 
 * @author Michaël Pourbaix <michael.pourbaix@uclouvain.be> 
 */
@Component({
  selector: 'ds-person-export-menu',
  template: `
    <button *ngIf="isAuthorized$ | async" class="btn btn-primary" (click)="openModal(exportModal)">
      <span>{{ 'context-menu.actions.person-export' | translate }}</span>
    </button>
    <ng-template #exportModal let-c="close" let-d="dismiss">
      <div class="modal-header">
        <h4 class="modal-title">{{'context-menu.actions.person-export.modal.title' | translate}}</h4>
        <button type="button"
                class="close"
                aria-label="Close"
                (click)="d('Cross click')">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body d-flex justify-content-center">
        <ng-container *ngFor="let export of availableExports">
          <a class="export-box d-flex flex-column align-items-center justify-content-between m-3 p-3 border border-primary rounded"
              [href]="export.exportPath"
              target="_blank">
            <img [src]="export.imagePath"/>
            <span class="font-weight-bold">{{ "context-menu.actions.person-export.modal.export." + export.name | translate }}</span>
          </a>
        </ng-container>
      </div>
    </ng-template>
  `,
  styleUrl: './person-export-menu.component.scss',
  standalone: true,
  imports: [
    TranslateModule,
    NgIf,
    AsyncPipe,
    NgFor,
  ]
})
export class PersonExportMenuComponent extends ContextMenuEntryComponent implements OnInit {
  protected readonly exportUrl = environment.rest.baseUrl + '/api/uclouvain/export';
  protected availableExports: any[] = [];
  protected isAuthorized$: Observable<boolean> = of(false);

  constructor(
    @Inject('contextMenuObjectProvider') protected injectedContextMenuObject: DSpaceObject,
    @Inject('contextMenuObjectTypeProvider') protected injectedContextMenuObjectType: DSpaceObjectType,
    protected authorizationService: AuthorizationDataService,
    protected modalService: NgbModal,
  ) {
    super(injectedContextMenuObject, injectedContextMenuObjectType, ContextMenuEntryType.ExportItem);
  }

  ngOnInit(): void {
    const profileUUID = this.contextMenuObject?.id;
    this.isAuthorized$ = combineLatest([
      this.isObjectValid(),
      this.authorizationService.isAuthorized(FeatureID.CanExportPersonBibliography, this.contextMenuObject.self)
    ]).pipe(
      tap(([valid, ignored]) => {
        if (valid) {
          this.availableExports = this.initAvailableExports(profileUUID);
        }
      }),
      map(([valid, authorized]) => valid && authorized)
    );
  }

  openModal(content: any): void {
    this.modalService.open(content, { size: 'lg' })
  }

  private initAvailableExports(profileUUID: string): any[] {
    const baseUrl = `${this.exportUrl}/`;
    const params = `?authorUUID=${profileUUID}`;
    return [
      { name: 'fnrs-export', image: 'FNRS_logo.png', path: 'fnrs' },
      { name: 'fwb-export', image: 'FWB_logo.png', path: 'fwb' }
    ].map(exp => ({
      name: exp.name,
      imagePath: `assets/uclouvain/images/export/${exp.image}`,
      exportPath: baseUrl + exp.path + params
    }));
  }

  private isObjectValid(): Observable<boolean> {
    if (isNotEmpty(this.contextMenuObject) && (this.contextMenuObject instanceof Item)) {
      let item = (this.contextMenuObject) as Item;
      if (item?.entityType === "Person") {
        return of(true);
      }
    }
    return of(false);
  }
}