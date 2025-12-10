import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APP_CONFIG, AppConfig } from '../../../config/app-config.interface';
import { RemoteDataBuildService } from '../cache/builders/remote-data-build.service';
import { GetRequest } from '../data/request.models';
import { RequestService } from '../data/request.service';
import { FNRSExplanation, FNRSValidation } from '../shared/fnrs-validation.model';
import { getFirstSucceededRemoteData, getRemoteDataPayload } from '../shared/operators';

/**
 * Service allowing publication FNRS validation
 *
 * @author Renaud Michotte (renaud.michotte@uclouvain.be)
 */
@Injectable({ providedIn: 'root' })
export class FnrsValidationService {

  constructor(
    @Inject(APP_CONFIG) protected appConfig: AppConfig,
    protected requestService: RequestService,
    protected rdbService: RemoteDataBuildService,
  ) { }

  // PUBLIC METHODS ====================================================================================================
  /**
   * Check if a document is valid according to FNRS rules
   * @param uuid the item UUID to check
   * @param useCachedVersionIfAvailable Is a previous cached response could be used?
   */
  validate(uuid: string, useCachedVersionIfAvailable = true): Observable<FNRSValidation> {
    const href = `${this.appConfig.rest.baseUrl}/api/uclouvain/fnrs/${uuid}/valid`;
    return this.sendRequest<FNRSValidation>(href, useCachedVersionIfAvailable);
  }

  /**
   * Get explanations about FNRS validation rules
   * @param uuid the item UUID to check
   * @param useCachedVersionIfAvailable Is a previous cached response could be used?
   */
  explain(uuid: string, useCachedVersionIfAvailable = true): Observable<FNRSExplanation> {
    const href = `${this.appConfig.rest.baseUrl}/api/uclouvain/fnrs/${uuid}/explain`;
    return this.sendRequest<FNRSExplanation>(href, useCachedVersionIfAvailable);
  }

  // PRIVATE METHODS ===================================================================================================
  /** Send request to the backend and wait a success response. */
  private sendRequest<T>(href: string, useCachedVersionIfAvailable = true): Observable<T> {
    const requestId = this.requestService.generateRequestId();
    const request = new GetRequest(requestId, href);
    this.requestService.send(request, useCachedVersionIfAvailable);
    return this.rdbService
      .buildFromRequestUUID<T>(requestId)
      .pipe(
        getFirstSucceededRemoteData(),
        getRemoteDataPayload()
      );
  }
}