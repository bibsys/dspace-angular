import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class FormDynamicUpdateRequestService {

    // Injecting httpClient into this class
    constructor(private httpClient: HttpClient){
    }

    /**
     * Generic method to make a HTTP GET call
     */
    public get(url: string) {
        return this.httpClient.get(url, {
            observe: 'body'
        });
    }
}
