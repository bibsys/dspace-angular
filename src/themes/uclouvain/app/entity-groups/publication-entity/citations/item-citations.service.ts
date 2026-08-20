import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ItemCitationsDataService } from 'src/app/core/data/item-citations-data.service';
import { ItemCitation, ItemCitations } from 'src/app/core/shared/item-citations.model';
import { getFirstSucceededRemoteDataWithNotEmptyPayload } from 'src/app/core/shared/operators';

/**
 * Service used by components to extract citations for a given item.
 * You can either extract the main citation for an item or all of the possible citations for an item.
 * 
 * @author Michaël Pourbaix <michael.pourbaix@uclouvain.be>
 */
@Injectable({ providedIn: 'root' })
export class ItemCitationsService {

  constructor(
    protected itemCitationsRDS: ItemCitationsDataService,
  ) {}

  /**
   * Generate a specific citation using the given format and itemUUID.
   * @param itemUUID The UUID of the item to generate a citation for.
   * @param style The desired citation style (apa, chicago, ...)
   * @param format The desired format of the citation (text, html, ...)
   * @returns An observable containing the generated citation
   */
  getCitationByFormat(itemUUID: string, style: string, format?: string): Observable<ItemCitation> {
    format = format || 'text';
    return this.itemCitationsRDS.findByIdAndStyle(itemUUID, style, format)
      .pipe(
        getFirstSucceededRemoteDataWithNotEmptyPayload(),
        map(response => response.citations.find((citation: ItemCitation) => format === citation.format))
      );
  }

  /**
   * Generate a specific citation using a specific crosswalk for an item.
   * @param itemUUID The UUID of the item to generate a citation for.
   * @param crosswalk The desired crosswalk to use to generate the citation
   * @returns An observable containing the generated citation
   */
  getCitationByCrosswalk(itemUUID: string, crosswalk: string): Observable<ItemCitation> {
    return this.itemCitationsRDS.findByIdAndCrosswalk(itemUUID, crosswalk)
      .pipe(
        getFirstSucceededRemoteDataWithNotEmptyPayload(),
        map(response => response.citations.find((citation: ItemCitation) => crosswalk === citation.format))
      );
  }

  /**
   * Generate all the citations for every existing format for a given item.
   * 
   * @param itemUUID The id of the item to get the citations for.
   * @returns An array containing all the possible citations for the given item.
   */
  getAllCitationsForItem(itemUUID: string): Observable<ItemCitations | ItemCitation[]> {
    return this.itemCitationsRDS.findById(itemUUID).pipe(
      getFirstSucceededRemoteDataWithNotEmptyPayload(),
    );
  }
}