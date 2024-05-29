import { Injectable } from '@angular/core';
import { RequestService } from '../../../../../app/core/data/request.service';
import { RemoteDataBuildService } from '../../../../../app/core/cache/builders/remote-data-build.service';
import { ObjectCacheService } from '../../../../../app/core/cache/object-cache.service';
import { HALEndpointService } from '../../../../../app/core/shared/hal-endpoint.service';
import { GetRequest } from '../../../../../app/core/data/request.models';
import { getFirstSucceededRemoteDataWithNotEmptyPayload } from '../../../../../app/core/shared/operators';
import { RemoteData } from '../../../../../app/core/data/remote-data';
import { Observable } from 'rxjs';

/**
 * This service allows to retrieve and manipulate all resource policies related to a {@Bistream}.
 *
 * Comparing to existing `ResourcePolicyService`, this service uses a custom "UCLouvain" API endpoint
 * returning ALL policies, even if the current logged user isn't allowed to read/see some policies (i.e. "administrator"
 * policy is only accessible/viewable by 'admin' role users. But as a simple user, we want to know a "admin policy"
 * still exists.
 */
@Injectable({
  providedIn: 'root'
})
export class AccessConditionsService {

  constructor(
    protected requestService: RequestService,
    protected rdbService: RemoteDataBuildService,
    protected objectCache: ObjectCacheService,
    protected halService: HALEndpointService
  ) { }

  //TODO :: still used in search-result list --> removed when 'access' subresource will available on Item
  searchByItem(UUID: string): Observable<any> {
    const request = new GetRequest(
      this.requestService.generateRequestId(),
      this.halService.getRootHref() + "/uclouvain/resourcepolicies/item/"+UUID
    );
    this.requestService.send(request);
    return this.rdbService
      .buildFromRequestUUID(request.uuid)
      .pipe(getFirstSucceededRemoteDataWithNotEmptyPayload());
  }
}