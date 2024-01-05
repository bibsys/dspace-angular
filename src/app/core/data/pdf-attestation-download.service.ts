import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable, catchError, of } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { NotificationsService } from 'src/app/shared/notifications/notifications.service';
import { saveAs } from 'file-saver';

/**
 * Service to generate a PDF attestation from the API.
 */
@Injectable()
export class PdfAttestationDownloadService {

    constructor(
        private httpClient: HttpClient,
        private notificationsService: NotificationsService,
        private translationService: TranslateService
    ){}

    /**
     * Generic method to make a HTTP GET call
     */
    private get(url: string) {
        return this.httpClient.get(url, {
            responseType: 'blob'
        });
    }

    /**
    * Calls the backend to generate an attestation based onb the uuid of the item.
    *
    * @param uuid: The item UUID.
    * @return: An observable for the request's response.
    */
    public getPDFAttestationForUUID(uuid: string): Observable<Blob> {
        return this.get(environment.rest.baseUrl + '/api/uclouvain/item/' + uuid + '/attestation');
    }

    /**
    * Triggers a call to the backend API to recover the attestation for a specific item and downloads it on the client computer.
    *
    * @param uuid: The item UUID.
    */
    public triggerPDFAttestationDownload(uuid: string): void {
        this.getPDFAttestationForUUID(uuid)
            .pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {
                // Send error notification to client using the notification service
                this.notificationsService.error(
                    this.translationService.get('submission.workflow.generic.attestation.error.title'),
                    this.translationService.get('submission.workflow.generic.attestation.error.content')
                );
                return of();
            }))
            .subscribe(response => saveAs(response, 'attestation.pdf'));
    }
}
