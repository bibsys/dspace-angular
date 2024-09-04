import { Injectable, Pipe, PipeTransform } from "@angular/core";
import { AffiliationData } from "src/app/core/data/publication-affiliation-data.service";

/**
 * Pipe used to format the display of an affiliation.
 * It takes an AffiliationData object and a separator string as arguments.
 * It simply returns the concatenation of the acronym and the name of the affiliation, separated by the separator.
 * 
 * @author Michaël Pourbaix <michael.pourbaix@uclouvain.be>
 */
@Injectable({ providedIn: 'root' })
@Pipe({
  name: 'affiliationDisplayFormat',
  standalone: true,
})
export class AffiliationDisplayFormatPipe implements PipeTransform {
    /**
     * Operate the concatenation of the acronym and the name of the affiliation, separated by the given separator.
     * @param affiliation the affiliation object to format.
     * @param separator the separator to use between the acronym and the name.
     * @returns the formatted string.
     */
    transform(affiliation: AffiliationData, separator = ' - '): string {
        return affiliation.acronym ? (affiliation.acronym + separator + affiliation.name) : affiliation.name;
    }
}