import { Injectable } from '@angular/core';
import { IdentifiableDataService } from './base/identifiable-data.service';
import { RequestService } from './request.service';
import { RemoteDataBuildService } from '../cache/builders/remote-data-build.service';
import { ObjectCacheService } from '../cache/object-cache.service';
import { HALEndpointService } from '../shared/hal-endpoint.service';
import { BitstreamAccessConditions } from '../shared/bitstream-access-conditions.model';

/**
 * A service responsible for fetching/sending data from/to the REST API on the bitstreamaccessconditions endpoint
 */
@Injectable({ providedIn: 'root' })
export class BitstreamAccessConditionsDataService extends IdentifiableDataService<BitstreamAccessConditions> {

  constructor(
    protected requestService: RequestService,
    protected rdbService: RemoteDataBuildService,
    protected objectCache: ObjectCacheService,
    protected halService: HALEndpointService,
  ) {
    super('bitstreamaccessconditions', requestService, rdbService, objectCache, halService);
  }
}
