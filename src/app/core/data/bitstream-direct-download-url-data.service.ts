import { Injectable } from '@angular/core';
import { IdentifiableDataService } from './base/identifiable-data.service';
import { RemoteDataBuildService } from '../cache/builders/remote-data-build.service';
import { ObjectCacheService } from '../cache/object-cache.service';
import { HALEndpointService } from '../shared/hal-endpoint.service';
import { RequestService } from './request.service';
import { BitstreamDirectDownloadURL } from '../shared/bitstream-direct-download-url.model';

@Injectable({ providedIn: 'root' })
export class BitstreamDirectDownloadUrlDataService extends IdentifiableDataService<BitstreamDirectDownloadURL>{
    constructor(
        protected requestService: RequestService,
        protected rdbService: RemoteDataBuildService,
        protected objectCache: ObjectCacheService,
        protected halService: HALEndpointService
    ) {
        super('bitstreamdirectdownloadurls', requestService, rdbService, objectCache, halService);
    }
}
