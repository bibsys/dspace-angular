import { Injectable } from '@angular/core';
import { IdentifiableDataService } from './base/identifiable-data.service';
import { dataService } from './base/data-service.decorator';
import { BITSTREAM_ACCESS_CONDITIONS } from '../shared/bitstream-access-conditions.resource-type';
import { BitstreamAccessConditions } from '../shared/bitstream-access-conditions.model';
import { RequestService } from './request.service';
import { RemoteDataBuildService } from '../cache/builders/remote-data-build.service';
import { ObjectCacheService } from '../cache/object-cache.service';
import { HALEndpointService } from '../shared/hal-endpoint.service';

/**
 * A service responsible for fetching/sending data from/to the REST API on the bitstreamaccessconditions endpoint
 */
@Injectable()
@dataService(BITSTREAM_ACCESS_CONDITIONS)
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
