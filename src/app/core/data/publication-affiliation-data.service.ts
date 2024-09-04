import { HttpParams } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { map, Observable, of, skipWhile } from "rxjs";
import { isEmpty, isNotEmpty } from "src/app/shared/empty.util";
import { environment } from "src/environments/environment";
import { RemoteDataBuildService } from "../cache/builders/remote-data-build.service";
import { RemoteData } from "./remote-data";
import { GetRequest } from "./request.models";
import { RequestService } from "./request.service";

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
@Injectable({ providedIn: 'root' })
export class PublicationAffiliationDataService {

  constructor(
    protected requestService: RequestService,
    protected rdbService: RemoteDataBuildService,
  ) {
  }

  /**
   * Main endpoint to get affiliation information. You must provide at least one of the two arguments.
   *
   * @param params the query string params to apply on the backend call to filter the result.
   *               available parameter keys are: 'parentUUID': string, 'depth': number
   * @returns An observable with the response corresponding to a list of objects.
   */
  public getAffiliation(params: { [key: string]: string | number | boolean } = null): Observable<AffiliationData[]> {
    let url = `${environment.rest.baseUrl}/api/uclouvain/affiliations/affiliationStructure`;
    if (isNotEmpty(params)) {
      url += '?' + new HttpParams({fromObject: params}).toString();
    }
    return this
      .get(url)
      .pipe(
        map((rd: RemoteData<AffiliationData[]>) => rd.payload ? Object.values(rd.payload) : []),
      );
  }

  /**
   * Get the root affiliations of the affiliations structure.
   *
   * @returns An observable with the response corresponding to a list of objects
   */
  public getRootAffiliations(): Observable<AffiliationData[]> {
    return this.getAffiliation({'depth': 0});
  }

  public getAffiliationsTree(): Observable<AffiliationData[]> {
    return this.getAffiliation();
  }

  /**
   * Generic method to make an HTTP GET call.
   * Uses the RequestService to send the request and the RemoteDataBuildService to build the response.
   * If the response is already in the cache, it will be returned immediately without making a request to the server.
   *
   * @param url The URL to make the GET request to.
   */
  private get(url: string): Observable<RemoteData<AffiliationData[]>> {
    const requestId = this.requestService.generateRequestId();
    const request = new GetRequest(requestId, url);
    this.requestService.send(request, true);
    // Search for the request response in the cache or send a request to the server
    return this.rdbService
      .buildSingle<AffiliationData[]>(of(url), ...[])
      .pipe(
        skipWhile((rd: RemoteData<AffiliationData[]>) => isEmpty(rd.payload))
      );
  }
}