import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { hasValue } from '../empty.util';

@Injectable({ providedIn: 'root'})
export class SurveysService {

  getCollectionSurvey(collectionId: string): string|undefined {
    let surveys: {[key: string]: string} = hasValue(environment.submission)
      ? environment.submission['collectionSurveys']
      : {};
    surveys = surveys || {};  // To ensure than objects UUID array isn't undefined
    return Object.entries(surveys).find(([_, value]) => value === collectionId)?.[0];
  }

}