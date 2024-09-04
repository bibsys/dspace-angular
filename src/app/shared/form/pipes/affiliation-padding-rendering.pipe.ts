import { Pipe, PipeTransform } from "@angular/core";

/**
 * Pipe used to format the display of an affiliation by adding a padding to the left of the string.
 * This added padding is used to display the affiliation in a tree-like structure.
 * 
 * @Author Michaël Pourbaix <michael.pourbaix@uclouvain.be>
 */
@Pipe({
    name: 'affiliationPaddingRendering'
})
export class AffiliationPaddingRenderingPipe implements PipeTransform {
    /**
     * Given a baseString, an index and a paddingTemplate, this function returns the baseString with 'index' times the padding string on the left of it.
     * @param originalString: The base string to add padding to.
     * @param index: The number of times the padding string should be added.
     * @param paddingTemplate: The string to use as padding.
     * @returns: The baseString with the correct padding added.
     */
    transform(baseString: string, index: number, paddingTemplate = '\u00A0\u00A0\u00A0\u00A0'): string {
        if (index <= 0) return baseString;

        let spacing = '';
        for (let i = 0; i < index; i++) spacing += paddingTemplate;
        return spacing + baseString;
    }
}