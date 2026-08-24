import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { catchError, Observable, of, tap, throwError } from "rxjs";
import { NotificationsService } from "src/app/shared/notifications/notifications.service";
import { environment } from "src/environments/environment";


/**
 * Service to (re-)send attestation emails for a given item.
 * This is super useful when a student/supervisor has not receive the attestation.
 * 
 * @author Michaël Pourbaix <michael.pourbaix@uclouvain.be>
 */
@Injectable({ providedIn: 'root' })
export class SendAttestationEmailService {

  constructor(
    private httpClient: HttpClient,
  ){}
  
  /**
   * Send a basic Http POST request to the endpoint to send attestation emails.
   * @param uuid The uuid of the object to send emails for.
   * @returns An observable containing the response text.
   */
  sendAttestationEmails(uuid: string): Observable<String> {
    const url = environment.rest.baseUrl + '/api/uclouvain/item/' + uuid + '/attestation/sendEmailAttestations';
    return this.httpClient.post(url, null, {
      responseType: 'text'
    });
  }
}