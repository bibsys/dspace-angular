import { Injectable } from "@angular/core";
import { map, Observable, of, skipWhile } from "rxjs";
import { isEmpty } from "src/app/shared/empty.util";
import { environment } from "src/environments/environment";
import { RequestService } from "./request.service";
import { RemoteDataBuildService } from "../cache/builders/remote-data-build.service";
import { GetRequest } from "./request.models";
import { RemoteData } from "./remote-data";

export interface AffiliationData {
    UUID: string;
    name: string;
    acronym: string;
    type: String;
    isSelectable: boolean;
    parent: string;
    children: AffiliationData[];
    index?: number;
}

/**
 * Service to get affiliations data from the backend structured as a tree.
 */
@Injectable()
export class PublicationAffiliationDataService {
    constructor(
        protected requestService: RequestService,
        protected rdbService: RemoteDataBuildService,
    ) {}

    /**
     * Generic method to make a HTTP GET call.
     * Uses the RequestService to send the request and the RemoteDataBuildService to build the response.
     * If the response is already in the cache, it will be returned immediately without making a request to the server.
     * 
     * @param url: The URL to make the GET request to.
     */
    private get(url: string): Observable<RemoteData<AffiliationData[]>> {
        const requestId = this.requestService.generateRequestId();
        const request = new GetRequest(requestId, url);
        this.requestService.send(request, true);
        // Search for the request response in the cache or send a request to the server
        return this.rdbService.buildSingle<AffiliationData[]>(of(url), ...[]).pipe(
            skipWhile((rd: RemoteData<AffiliationData[]>) => isEmpty(rd.payload))
        );
    }

    /**
     * Main endpoint to get affiliation information. You must provide at least one of the two arguments. 
     * @param parentUUID: A UUID of an affiliation object to get full information about it.
     * @param depth: The depth of the recursive search for children affiliations.
     * @returns: An observable with the response corresponding to a list of objects.
     */
    public getAffiliation(parentUUID: String = null, depth: number = null): Observable<AffiliationData[]> {
        let baseArgs = [];

        if (!isEmpty(parentUUID)) {
            baseArgs.push(`parentUUID=${parentUUID}`);
        }
        if (!isEmpty(depth)) {
            baseArgs.push(`depth=${depth}`);
        }

        return this.get(`${environment.rest.baseUrl}/api/uclouvain/affiliations/affiliationStructure${baseArgs.length ? ('?' + baseArgs.join('&')): ''}`).pipe(
            map((rd: RemoteData<AffiliationData[]>) => {
                return rd.payload ? Object.values(rd.payload) : [];
            }),
        );
    }

    /**
     * Get the root affiliations of the affiliations structure. 
     * @returns: An observable with the response corresponding to a list of objects
     */
    public getRootAffiliations(): Observable<AffiliationData[]> {
        return this.getAffiliation(null, 0);
    }

    public getAffiliationsTree(): Observable<AffiliationData[]> {
        return this.getAffiliation();
    }
}