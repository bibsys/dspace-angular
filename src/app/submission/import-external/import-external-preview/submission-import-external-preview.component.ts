import {
  NgFor,
  NgIf, NgTemplateOutlet,
} from '@angular/common';
import {
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import {
  NgbActiveModal,
  NgbModal,
  NgbModalRef,
} from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { mergeMap } from 'rxjs/operators';

import { ExternalSourceEntry } from '../../../core/shared/external-source-entry.model';
import { MetadataMap, MetadataValue } from '../../../core/shared/metadata.models';
import { Metadata } from '../../../core/shared/metadata.utils';
import { SubmissionObject } from '../../../core/submission/models/submission-object.model';
import { CollectionListEntry } from '../../../shared/collection-dropdown/collection-dropdown.component';
import { PLACEHOLDER_PARENT_METADATA } from '../../../shared/form/builder/ds-dynamic-form-ui/ds-dynamic-form-constants';
import { NotificationsService } from '../../../shared/notifications/notifications.service';
import { TruncatableComponent } from '../../../shared/truncatable/truncatable.component';
import { TruncatablePartComponent } from '../../../shared/truncatable/truncatable-part/truncatable-part.component';
import { SubmissionService } from '../../submission.service';
import { SubmissionImportExternalCollectionComponent } from '../import-external-collection/submission-import-external-collection.component';


export interface Author {
  name: string,
  role: string,
  institution?: string;
  orcid?: string;
  fgs?: string;
  email?: string;
}

/**
 * This component display a preview of an external source item.
 */
@Component({
  selector: 'ds-submission-import-external-preview',
  styleUrls: ['./submission-import-external-preview.component.scss'],
  templateUrl: './submission-import-external-preview.component.html',
  imports: [
    NgFor,
    TranslateModule,
    TruncatablePartComponent,
    TruncatableComponent,
    NgIf,
    NgTemplateOutlet,
  ],
  standalone: true,
})
export class SubmissionImportExternalPreviewComponent implements OnInit {
  /**
   * The external source entry
   */
  @Input() public externalSourceEntry: ExternalSourceEntry;
  /**
   * The entry metadata list
   */
  public metadataList: { key: string, values: MetadataValue[] }[];
  public authorList: Author[] = [];
  /**
   * The label prefix to use to generate the translation label
   */
  public labelPrefix: string;
  /**
   * The modal for the entry preview
   */
  modalRef: NgbModalRef;

  private hiddenMetadataKeys = [
    "dc.contributor.author",
    "authors.identifier.fgs",
    "authors.identifier.orcid",
    "authors.institution.code",
    "authors.email",
    "authors.role"
  ];

  /**
   * Initialize the component variables.
   * @param {NgbActiveModal} activeModal
   * @param {SubmissionService} submissionService
   * @param {NgbModal} modalService
   * @param {Router} router
   * @param {NotificationsService} notificationService
   */
  constructor(
    private activeModal: NgbActiveModal,
    private submissionService: SubmissionService,
    private modalService: NgbModal,
    private router: Router,
    private notificationService: NotificationsService,
  ) { }

  /**
   * Metadata initialization for HTML display.
   */
  ngOnInit(): void {
    this.metadataList = [];
    Metadata.all(this.externalSourceEntry.metadata, "dc.contributor.author")
      .forEach((authorMd, idx) => this.authorList.push(this._getAuthorInformation(authorMd, idx)));
    const metadataKeys = Object
      .keys(this.externalSourceEntry.metadata)
      .filter(k => !this.hiddenMetadataKeys.includes(k));
    metadataKeys.forEach((key) => {
      this.metadataList.push({
        key: key,
        values: Metadata.all(this.externalSourceEntry.metadata, key),
      });
    });

  }
  private _getAuthorInformation(metadata: MetadataValue, idx: number) {
    return Object.assign({
      name: metadata.value,
      role: this._getMetadataForIndex(this.externalSourceEntry.metadata, "authors.role", idx),
      institution: this._getMetadataForIndex(this.externalSourceEntry.metadata, "authors.institution.code", idx),
      email: this._getMetadataForIndex(this.externalSourceEntry.metadata, "authors.email", idx),
      fgs: this._getMetadataForIndex(this.externalSourceEntry.metadata, "authors.identifier.fgs", idx),
      orcid: this._getMetadataForIndex(this.externalSourceEntry.metadata, "authors.identifier.orcid", idx),
    }) as Author;
  }

  private _getMetadataForIndex(mdMap: MetadataMap, key: string, idx: number) {
    const mdValues: string[] = Metadata.allValues(mdMap, key);
    return (idx <= mdValues.length && mdValues[idx] !== PLACEHOLDER_PARENT_METADATA)
      ? mdValues[idx]
      : null;
  }


  /**
   * Closes the modal.
   */
  public closeMetadataModal(): void {
    this.activeModal.dismiss(false);
  }

  /**
   * Start the import of an entry by opening up a collection choice modal window.
   */
  public import(): void {
    this.modalRef = this.modalService.open(SubmissionImportExternalCollectionComponent, {
      size: 'lg',
    });
    this.modalRef.componentInstance.entityType = this.labelPrefix;
    this.closeMetadataModal();

    this.modalRef.componentInstance.selectedEvent.pipe(
      mergeMap((collectionListEntry: CollectionListEntry) => {
        return this.submissionService.createSubmissionFromExternalSource(this.externalSourceEntry._links.self.href, collectionListEntry.collection.id);
      }),
    ).subscribe((submissionObjects: SubmissionObject[]) => {
      let isValid = false;
      if (submissionObjects.length === 1) {
        if (submissionObjects[0] !== null) {
          isValid = true;
          this.router.navigateByUrl('/workspaceitems/' + submissionObjects[0].id + '/edit');
        }
      }
      if (!isValid) {
        this.notificationService.error('submission.import-external.preview.error.import.title', 'submission.import-external.preview.error.import.body');
      }
      this.modalRef.close();
    });
  }
}
