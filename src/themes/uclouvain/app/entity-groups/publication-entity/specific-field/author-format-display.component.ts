import { Component, Input, OnInit } from "@angular/core";
import { Item } from "src/app/core/shared/item.model";

/**
 * Component to render the author list for a given item using the following rules:
 * - If there are 5 authors or less, just display all the authors.
 * - If there are more than 5 authors, display the first 4 and the last one.
 *  Also add an 'et.al.' at the end of the list to indicate that there are more authors not displayed.
 * 
 * @author Michaël Pourbaix (michael.pourbaix@uclouvain.be)
 */
@Component({
    selector: 'ds-author-format-display',
    template: `<div class="d-flex align-items-center">
        <ng-container *ngFor="let author of authorList; index as i; let last=last;">
            <ds-item-link-view [metadataValue]="author"/>
            <span *ngIf="!last" class="mr-2"> ; </span>
        </ng-container>
        <span *ngIf="hasEtal"
              class="ml-1 font-italic text-muted"
              ngbTooltip="{{ 'search.result.publication.authors.etal.tooltip' | translate }}">et.al.</span>
    </div>`,
    styles: ['.orcid-icon { height: 1.1rem; }'],
})
export class AuthorFormatDisplayComponent implements OnInit {
    @Input() item: Item;

    protected authorField = 'dc.contributor.author';
    protected authorList: any[] = [];
    protected hasEtal = false;
    
    ngOnInit(): void {
        let authors = this.item.allMetadata(this.authorField);
        if (authors.length > 5) {
            let finalAuthor = authors[authors.length - 1];
            authors = authors.slice(0, 4);
            authors.push(finalAuthor);
            this.hasEtal = true;
        }
        this.authorList = authors;
    }
}