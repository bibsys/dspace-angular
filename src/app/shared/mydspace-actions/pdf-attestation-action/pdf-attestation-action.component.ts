import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Item } from 'src/app/core/shared/item.model';
import { Observable, Subscription } from 'rxjs';
import { NotificationsService } from '../../notifications/notifications.service';
import { FeatureID } from 'src/app/core/data/feature-authorization/feature-id';
import { AuthorizationDataService } from 'src/app/core/data/feature-authorization/authorization-data.service';
import { PdfAttestationDownloadService } from 'src/app/core/data/pdf-attestation-download.service';

/**
 * Button component that allows an authorized user to download a PDF attestation for a submission from the myDSpace page.
 */
@Component({
    selector: 'ds-pdf-attestation-action',
    templateUrl: './pdf-attestation-action.component.html',
})
export class PdfAttestationActionComponent implements OnInit, OnDestroy {

    @Input() object: Item;

    // Additional css classes to add to the component
    @Input() additionalClasses: string[]= [];

    objectId: string;

    isAuthorized$: Observable<boolean>;

    private subscriptions = new Subscription();

    public constructor(
        private pdfAttestationDownloadService: PdfAttestationDownloadService,
        private notificationsService: NotificationsService,
        private authorizationService: AuthorizationDataService
    ) {
    }

    ngOnInit(): void {
        this.subscriptions.add(
            this.notificationsService.claimedProfile.subscribe(() => {
                this.isAuthorized$ = this.authorizationService.isAuthorized(FeatureID.CanDownloadPDFAttestation, this.object.self, undefined, false);
            })
        );
        this.initDSOAttestationRoute(this.object.id);
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }

    private initDSOAttestationRoute(itemID: string) {
        this.objectId = itemID;
    }

    /**
    * Called when the user click on the action button. Triggers a download.
    */
    generateAttestationDownloadURL() {
        this.pdfAttestationDownloadService.triggerPDFAttestationDownload(this.objectId);
    }
}
