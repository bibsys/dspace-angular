import { AffiliationPaddingRenderingPipe } from "./affiliation-padding-rendering.pipe";
import { TestBed } from "@angular/core/testing";

/**
 * Test suite for AffiliationPaddingRenderingPipe.
 * 
 * @Author Michaël Pourbaix <michael.pourbaix@uclouvain.be>
 */
describe('AffiliationDisplayFormatPipe', () => {
    let affiliationPaddingRenderingPipe: AffiliationPaddingRenderingPipe;
    beforeEach(() => {
        TestBed.configureTestingModule({
          providers: [
            AffiliationPaddingRenderingPipe
          ],
        }).compileComponents();
        
        affiliationPaddingRenderingPipe = TestBed.inject(AffiliationPaddingRenderingPipe);
    });

    it('should return a string with no padding if the index is 0', () => {
        expect(affiliationPaddingRenderingPipe.transform('test', 0))
            .toBe('test');
    });

    it('should return a string with no padding if the index is lower than 0', () => {
        expect(affiliationPaddingRenderingPipe.transform('test', -5))
            .toBe('test');
    });

    it('should return a string with no padding if the index is greater than 0 but the padding is empty', () => {
        expect(affiliationPaddingRenderingPipe.transform('test', 5, ''))
            .toBe('test');
    });

    it('should return a string with the correct padding if the index is greater than 0 and the padding is not empty', () => {
        expect(affiliationPaddingRenderingPipe.transform('test', 5, '-'))
            .toBe('-----test');
    });

    it('should return a string with the correct padding if the index is greater than 0 and the padding is not empty', () => {
        expect(affiliationPaddingRenderingPipe.transform('test', 3, 'plop '))
            .toBe('plop plop plop test');
    });

    it('should return a string with the correct padding if the index is greater than 0 using default padding', () => {
        expect(affiliationPaddingRenderingPipe.transform('test', 1))
            .toBe('\u00A0\u00A0\u00A0\u00A0test');
    });
})