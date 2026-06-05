import { HttpClient, HttpResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthorizationDataService } from '../../../core/data/feature-authorization/authorization-data.service';
import { FeatureID } from '../../../core/data/feature-authorization/feature-id';
import { Item } from '../../../core/shared/item.model';
import { NotificationsService } from '../../notifications/notifications.service';
import { ContextMenuEntryComponent } from "../context-menu-entry.component";
import { DSpaceObject } from "src/app/core/shared/dspace-object.model";
import { DSpaceObjectType } from "src/app/core/shared/dspace-object-type.model";
import { ContextMenuEntryType } from "../context-menu-entry-type";
import { environment } from "src/environments/environment";
import { TranslateModule, TranslateService } from "@ngx-translate/core";
import { AsyncPipe, NgFor, NgIf } from "@angular/common";
import { combineLatest, map, Observable, of } from "rxjs";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { isEmpty, isNotEmpty } from "../../empty.util";
import { PUBLICATION_EXPORT_SCRIPT_NAME, ScriptDataService } from 'src/app/core/data/processes/script-data.service';
import { getFirstCompletedRemoteData } from 'src/app/core/shared/operators';
import { RemoteData } from 'src/app/core/data/remote-data';
import { Process } from 'src/app/process-page/processes/process.model';
import { ProcessParameter } from 'src/app/process-page/processes/process-parameter.model';

/**
 * Component to export a user profile bibliography.
 * 
 * @author Michaël Pourbaix <michael.pourbaix@uclouvain.be>
 * @author Renaud Michotte <renaud.michotte@uclouvain.be>
 */
@Component({
  selector: 'ds-person-export-menu',
  templateUrl: './person-export-menu.component.html',
  standalone: true,
  imports: [
    TranslateModule,
    NgIf,
    AsyncPipe,
    NgFor,
    ReactiveFormsModule
  ]
})
export class PersonExportMenuComponent extends ContextMenuEntryComponent implements OnInit {

  protected readonly restBaseUrl = environment.rest.baseUrl + '/api/uclouvain/export';
  protected isAuthorized$: Observable<boolean> = of(false);
  protected exportForm: FormGroup;
  protected styles = [
    { id: 'fnrs', label: 'FNRS', logo: 'assets/uclouvain/images/export/FNRS_logo.png' },
    { id: 'fwb', label: 'FWB', logo: 'assets/uclouvain/images/export/FWB_logo.png' }
  ];

  constructor(
    @Inject('contextMenuObjectProvider') protected injectedContextMenuObject: DSpaceObject,
    @Inject('contextMenuObjectTypeProvider') protected injectedContextMenuObjectType: DSpaceObjectType,
    protected authorizationService: AuthorizationDataService,
    protected modalService: NgbModal,
    private formBuilder: FormBuilder,
    private notificationsService: NotificationsService,
    private scriptDataService: ScriptDataService,
    private translate: TranslateService,
  ) {
    super(injectedContextMenuObject, injectedContextMenuObjectType, ContextMenuEntryType.ExportItem);
  }

  ngOnInit(): void {
    this.initForm();

    this.isAuthorized$ = combineLatest([
      this.isObjectValid(),
      this.authorizationService.isAuthorized(FeatureID.CanExportPersonBibliography, this.contextMenuObject.self)
    ]).pipe(
      map(([valid, authorized]) => valid && authorized)
    );
  }

  openModal(content: any): void {
    this.modalService.open(content, { size: 'lg' })
  }

  private initForm() {
    this.exportForm = this.formBuilder.group({
      style: ['fnrs'], // default value
      startYear: [null],
      endYear: [null],
      includePoster: [false]
    });
  }


  onSubmit() {
    const values = this.exportForm.value;
    const profileUUID = this.contextMenuObject.id;

    const params = [];

    // NOTE: This is an updated version that will retrieve the export result trough a process rather than through an HTTP call.
    // This avoids timeouts when fetching a big export for 1000+ publications.
    this.addParamIfExists("-u", profileUUID, params);
    this.addParamIfExists("-s", values.startYear, params);
    this.addParamIfExists("-e", values.endYear, params);
    this.addParamIfExists("-i", values.includePoster ? "true" : "false", params);
    this.addParamIfExists("-t", values.style, params);

    this.scriptDataService.invoke(PUBLICATION_EXPORT_SCRIPT_NAME, params, [])
      .pipe(
        getFirstCompletedRemoteData(),
        map((rd: RemoteData<Process>) => {
          if (rd.isSuccess) {
            const payload: any = rd.payload;
            return payload.processId;
          } else {
            const title = this.translate.get('process.new.notification.error.title');
            const content = this.translate.get('process.new.notification.error.content');
            this.notificationsService.error(title, content);
            return null;
          }
        })
      ).subscribe((processId) => {
        if (!isEmpty(processId)) {
          const title = this.translate.get('item-export.process.title');
          this.notificationsService.process(processId.toString(), 5000, title);
        }
      })
  }

  addParamIfExists(label: string, value: any, params: ProcessParameter[]): void {
    if (!isEmpty(value)) {
      params.push(Object.assign(new ProcessParameter(), { "name": label, "value": value }));
    }
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