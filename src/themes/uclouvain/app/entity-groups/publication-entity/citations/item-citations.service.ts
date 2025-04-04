import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ItemCitationsDataService } from 'src/app/core/data/item-citations-data.service';
import { RemoteData } from 'src/app/core/data/remote-data';
import { ItemCitation, ItemCitations } from 'src/app/core/shared/item-citations.model';
import { getFirstCompletedRemoteData, getFirstSucceededRemoteDataWithNotEmptyPayload } from 'src/app/core/shared/operators';
import { isNotEmpty } from 'src/app/shared/empty.util';
import { environment } from 'src/environments/environment';

/**
 * Service used by components to extract citations for a given item.
 * You can either extract the main citation for an item or all of the possible citations for an item.
 * 
 * @author Michaël Pourbaix <michael.pourbaix@uclouvain.be>
 */
@Injectable({ providedIn: 'root' })
export class ItemCitationsService {

  private mainFormat: string;

  constructor(
    protected itemCitationsRDS: ItemCitationsDataService,
  ) {
    this.mainFormat = environment.item.citations.mainFormat;
  }

  /**
   * Generate a specific citation using the given format and itemUUID.
   * @param itemUUID The UUID of the item to generate a citation for.
   * @param format 
   * @returns 
   */
  getCitationByFormat(itemUUID: string, format: string): Observable<ItemCitation> {
    return this.itemCitationsRDS.findByIdAndFormat(itemUUID, format)
      .pipe(
        getFirstSucceededRemoteDataWithNotEmptyPayload(),
        map(response => response.citations.find((citation: ItemCitation) => format === citation.format))
      );
  }

  /** 
   * Get a single main citation for the given item.
   * The main format to use to generate the 'main citation' is retrieved form the configuration.
   *
   * @param itemUUID The id of the item to generate the citation for.
   * @return The main citation for the given item or null if nothing could be generated.
   */
  getMainCitationForItem(itemUUID: string): Observable<string> {
    return this.getCitationByFormat(itemUUID, this.mainFormat)
      .pipe(map(response => response?.citation));
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