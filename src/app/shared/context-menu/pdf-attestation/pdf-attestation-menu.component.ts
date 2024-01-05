import { Component, Inject, OnDestroy, OnInit } from '@angular/core';

import { Observable, Subscription } from 'rxjs';

import { DSpaceObject } from '../../../core/shared/dspace-object.model';
import { AuthorizationDataService } from '../../../core/data/feature-authorization/authorization-data.service';
import { ContextMenuEntryComponent } from '../context-menu-entry.component';
import { DSpaceObjectType } from '../../../core/shared/dspace-object-type.model';
import { rendersContextMenuEntriesForType } from '../context-menu.decorator';
import { NotificationsService } from '../../notifications/notifications.service';
import { ContextMenuEntryType } from '../context-menu-entry-type';
import { FeatureID } from 'src/app/core/data/feature-authorization/feature-id';
import { PdfAttestationDownloadService } from 'src/app/core/data/pdf-attestation-download.service';

@Component({
  selector: 'ds-pdf-attestation-menu',
  templateUrl: './pdf-attestation-menu.component.html'
})
@rendersContextMenuEntriesForType(DSpaceObjectType.ITEM, true)
/**
 * Display a button allowing to download a PDF attestation from the item view
 */
export class PDFAttestationMenuComponent extends ContextMenuEntryComponent implements OnInit, OnDestroy {

    /**
     * Whether or not the current user is authorized to edit the DSpaceObject
     */
    isAuthorized$: Observable<boolean>;

    private subscriptions = new Subscription();

    /**
     * Initialize instance variables
     *
     * @param {DSpaceObject} injectedContextMenuObject
     * @param {DSpaceObjectType} injectedContextMenuObjectType
     * @param {AuthorizationDataService} authorizationService
     * @param {NotificationsService} notificationService
     * @param {PdfAttestationDownloadService} pdfAttestationDownloadService
     */
    constructor(
        @Inject('contextMenuObjectProvider') protected injectedContextMenuObject: DSpaceObject,
        @Inject('contextMenuObjectTypeProvider') protected injectedContextMenuObjectType: DSpaceObjectType,
        private authorizationService: AuthorizationDataService,
        private notificationService: NotificationsService,
        private pdfAttestationDownloadService: PdfAttestationDownloadService,
    ) {
        super(injectedContextMenuObject, injectedContextMenuObjectType, ContextMenuEntryType.PdfAttestation);
    }

    ngOnInit() {
        this.subscriptions.add(this.notificationService.claimedProfile.subscribe(() => {
            this.isAuthorized$ = this.authorizationService.isAuthorized(FeatureID.CanDownloadPDFAttestation, this.contextMenuObject.self, undefined, false);
        }));
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }

    /**
    * Called when the user click on the menu button. Triggers a download.
    */
    generateAttestationDownloadURL(){
        this.pdfAttestationDownloadService.triggerPDFAttestationDownload(this.injectedContextMenuObject.uuid);
    }
}
