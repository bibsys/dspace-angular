import { AffiliationData } from "src/app/core/data/publication-affiliation-data.service";
import { AffiliationDisplayFormatPipe } from "./affiliation-display-format.pipe";
import { TestBed } from "@angular/core/testing";

/**
 * Test suite for AffiliationDisplayFormatPipe.
 * 
 * @Author Michaël Pourbaix <michael.pourbaix@uclouvain.be>
 */
describe('AffiliationDisplayFormatPipe', () => {
    let affiliationDisplayFormatPipe: AffiliationDisplayFormatPipe;

    let testAffiliation: AffiliationData;

    beforeEach(() => {
        TestBed.configureTestingModule({
          providers: [
            AffiliationDisplayFormatPipe
          ],
        }).compileComponents();
        
        affiliationDisplayFormatPipe = TestBed.inject(AffiliationDisplayFormatPipe);
        testAffiliation = {
            acronym: 'UCL',
            name: 'Université catholique de Louvain',
            UUID: '1234',
            type: 'University',
            isSelectable: true,
            parent: null,
            children: []
        }
    });

    it('should return the affiliation name if the acronym is not defined', () => {
        testAffiliation.acronym = null;
        expect(affiliationDisplayFormatPipe.transform(testAffiliation))
            .toBe('Université catholique de Louvain');
    })

    it('should return the affiliation name if the acronym is not defined', () => {
        testAffiliation.acronym = null;
        expect(affiliationDisplayFormatPipe.transform(testAffiliation, ' --- '))
            .toBe('Université catholique de Louvain');
    })

    it('should return the affiliation name with default separator if the acronym is defined', () => {
        expect(affiliationDisplayFormatPipe.transform(testAffiliation))
            .toBe('UCL - Université catholique de Louvain');
    })

    it('should return the affiliation name with custom separator if the acronym is defined', () => {
        expect(affiliationDisplayFormatPipe.transform(testAffiliation, ' + '))
            .toBe('UCL + Université catholique de Louvain');
    })

    it('should return the affiliation name with custom separator if the acronym is defined', () => {
        expect(affiliationDisplayFormatPipe.transform(testAffiliation, ' --- '))
            .toBe('UCL --- Université catholique de Louvain');
    })
})