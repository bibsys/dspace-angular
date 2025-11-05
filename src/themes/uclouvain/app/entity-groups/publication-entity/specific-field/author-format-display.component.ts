import { NgForOf, NgIf } from "@angular/common";
import { Component, Input, OnInit } from "@angular/core";
import { Item } from "src/app/core/shared/item.model";
import { ItemLinkViewComponent } from "../../../shared/item-link-view/item-link-view.component";

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
            <span *ngIf="!last" class="mx-1">;</span>
        </ng-container>
        <ng-container *ngIf="hasEtal">
            <span class="mx-1">;</span>
            <span>et.al.</span>
        </ng-container>
    </div>`,
    standalone: true,
    imports: [NgForOf, ItemLinkViewComponent, NgIf],
})
export class AuthorFormatDisplayComponent implements OnInit {
    @Input() item: Item;

    protected authorField = 'dc.contributor.author';
    protected authorList: any[] = [];
    protected hasEtal = false;
    
    ngOnInit(): void {
        let authors = this.item.allMetadata(this.authorField);
        if (authors.length > 5) {
          authors = [...authors.slice(0, 4), authors[authors.length - 1]];
          this.hasEtal = true;
        }
        this.hasEtal = this.hasEtal || this.item.firstMetadataValue("dc.contributor.etal") === 'true';
        this.authorList = authors;
    }
}