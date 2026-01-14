import { Component, Inject, OnInit, TemplateRef, ViewChild } from "@angular/core";
import { ContextMenuEntryComponent } from "../context-menu-entry.component";
import { DSpaceObject } from "src/app/core/shared/dspace-object.model";
import { DSpaceObjectType } from "src/app/core/shared/dspace-object-type.model";
import { ContextMenuEntryType } from "../context-menu-entry-type";
import { environment } from "src/environments/environment";
import { TranslateModule } from "@ngx-translate/core";
import { AsyncPipe, NgFor, NgIf } from "@angular/common";
import { Observable, of } from "rxjs";
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
    protected modalService: NgbModal,
  ) {
    super(injectedContextMenuObject, injectedContextMenuObjectType, ContextMenuEntryType.ExportItem);
  }

  ngOnInit(): void {
    // Only display the component if the current object is a Person profile.
    if (isEmpty(this.contextMenuObject) || (this.contextMenuObject['entityType'] !== 'Person')) {
      this.isAuthorized$ = of(false);
      return;
    }
    const profileUUID = this.contextMenuObject?.id;
    this.availableExports = [
      {
        name: 'fnrs-export',
        imagePath: 'assets/uclouvain/images/export/FNRS_logo.png',
        exportPath: this.exportUrl + '/fnrs?authorUUID=' + profileUUID
      },
      {
        name: 'fwb-export',
        imagePath: 'assets/uclouvain/images/export/FWB_logo.png',
        exportPath: this.exportUrl + '/fwb?authorUUID=' + profileUUID
      },
    ];
    this.isAuthorized$ = of(true);
  }

  openModal(content: any): void {
    this.modalService.open(content, { size: 'lg' })
  }
}