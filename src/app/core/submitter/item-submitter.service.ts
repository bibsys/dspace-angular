import { Injectable } from "@angular/core";
import { map, Observable, of, skipWhile } from "rxjs";
import { environment } from "src/environments/environment";
import { RequestService } from "../data/request.service";
import { RemoteDataBuildService } from "../cache/builders/remote-data-build.service";
import { GetRequest } from "../data/request.models";
import { getFirstSucceededRemoteDataPayload } from "../shared/operators";
import { RemoteData } from "../data/remote-data";
import { isEmpty } from "src/app/shared/empty.util";

interface SubmitterInfo {
    submitterName: string,
    submitterEmail: string
}

/**
 * Service to retrieve information about the submitter of an item.
 * 
 * @author Michaël Pourbaix <michael.pourbaix@uclouvain.be>
 */
@Injectable({ providedIn: 'root' })
export default class ItemSubmitterService {
    baseUrl = environment.rest.baseUrl;

    constructor(
        protected requestService: RequestService,
        protected rdbService: RemoteDataBuildService,
    ) {}

    private getBaseUrl(uuid: string) {
        return `${this.baseUrl}/api/uclouvain/submitter/${uuid}`;
    }

    /**
     * Get the name of the submitter of a given item.
     * 
     * @param uuid The uuid of the item.
     * @returns The name of the submitter of the item.
     */
    public getItemSubmitterName(uuid: string): Observable<string> {
        return this.getItemSubmitter(uuid).pipe(map(submitter => submitter.submitterName));
    }

    public getItemSubmitterEmail(uuid: string): Observable<string> {
        return this.getItemSubmitter(uuid).pipe(map(submitter => submitter.submitterEmail));
    }

    public getItemSubmitter(uuid: string): Observable<SubmitterInfo> {
        return this.get(this.getBaseUrl(uuid));
    }

    private get(url: string): Observable<SubmitterInfo> {
        const requestId = this.requestService.generateRequestId();
        const request = new GetRequest(requestId, url);
        this.requestService.send(request, true);
        // Search for the request response in the cache or send a request to the server
        return this.rdbService
            .buildSingle<SubmitterInfo>(of(url))
            .pipe(
                skipWhile((rd: RemoteData<SubmitterInfo>) => isEmpty(rd.payload)),
                getFirstSucceededRemoteDataPayload()
            );
    }
}