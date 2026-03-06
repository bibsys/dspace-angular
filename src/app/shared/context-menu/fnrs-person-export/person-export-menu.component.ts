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
import { TranslateModule } from "@ngx-translate/core";
import { AsyncPipe, NgFor, NgIf } from "@angular/common";
import { combineLatest, map, Observable, of } from "rxjs";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { isNotEmpty } from "../../empty.util";

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
    private httpClient: HttpClient,
    private notificationsService: NotificationsService,
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

    // Build baseURL : /api/uclouvain/export/{style}?uuid={uuid}
    let url = `${this.restBaseUrl}/${values.style}?uuid=${profileUUID}`;

    // Add additional parameters if needed
    if (values.startYear) url += `&startYear=${values.startYear}`;
    if (values.endYear) url += `&endYear=${values.endYear}`;
    if (values.includePoster) url += `&includePoster=true`;

    this.httpClient.get(url, {
      responseType: 'blob',
      observe: 'response'
    }).subscribe({
      next: (response: HttpResponse<Blob>) => {
        this.downloadFile(response, values.style);
        this.notificationsService.success(null, 'export.modal.process.success');
      },
      error: (err) => {
        this.notificationsService.error(null, 'export.modal.process.error' + " : " + err);
    }});
  }

  private downloadFile(response: HttpResponse<Blob>, style: string) {
    const contentDisposition = response.headers.get('Content-Disposition');
    const fileName = contentDisposition
      ? contentDisposition.split('filename=')[1]?.replace(/"/g, '')
      : `export-${style}.pdf`;

    const blob = response.body;
    if (blob) {
      const downloadURL = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadURL;
      link.download = fileName;
      link.click();
      window.URL.revokeObjectURL(downloadURL);
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