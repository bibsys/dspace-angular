import { Component, Inject, Input, OnInit } from "@angular/core";
import { itemPageMetadataListElementComponent } from "../../item-page-metadata-list.decorator";
import { Item } from "src/app/core/shared/item.model";
import { MetadataValue } from "src/app/core/shared/metadata.models";
import { isNotEmpty } from "src/app/shared/empty.util";
import { PLACEHOLDER_PARENT_METADATA } from "src/app/shared/form/builder/ds-dynamic-form-ui/ds-dynamic-form-constants";
import { NgIf } from "@angular/common";
import { ItemLinkViewComponent } from "src/themes/uclouvain/app/shared/item-link-view/item-link-view.component";
import { NgbTooltipModule } from "@ng-bootstrap/ng-bootstrap";
import { TranslateModule } from "@ngx-translate/core";

/**
 * Renders a list element for an author. 
 * 
 * @author Michaël Pourbaix (michael.pourbaix@uclouvain.be)
 */
@itemPageMetadataListElementComponent('dc.contributor.author')
@Component({
  selector: 'ds-item-page-author-list-element',
  template: `<div class="d-flex">
    <span *ngIf="isNotEmpty(authorName)">
      <ds-item-link-view [metadataValue]="metadataValue"/>
    </span>
    <span *ngIf="hasOrcid" class="ml-1">
      <img placement="top"
           ngbTooltip="{{ 'orcid.badge.tooltip' | translate }}"
           class="orcid-icon"
           alt="orcid-logo"
           src="assets/images/orcid.logo.icon.svg"/>
    </span>
    <span *ngIf="isNotEmpty(authorRole)" class="ml-2 text-muted font-italic">({{ authorRole }})</span>
    <span *ngIf="isNotEmpty(authorInstitution)" class="ml-2">{{ authorInstitution }}</span>
  </div>`,
  styles: ['.orcid-icon { height: 1.2rem; }'],
  standalone: true,
  imports: [
    NgIf,
    ItemLinkViewComponent,
    NgbTooltipModule,
    TranslateModule,
  ],
})
export class ItemPageAuthorListElementComponent implements OnInit {
  protected authorName: string;
  protected authorRole: string;
  protected authorInstitution: string;
  protected hasOrcid: boolean = false;

  constructor(
    @Inject('item') readonly item: Item,
    @Inject('metadataValue') readonly metadataValue: MetadataValue,
    @Inject('index') readonly index: number,
  ) { }

  ngOnInit(): void {
    this.authorName = this.metadataValue.value;
    this.authorRole = this.item.findMetadataSortedByPlace('authors.role')[this.index]?.value;
    // TODO: Extract author institution form researcher profile.
    this.authorInstitution = undefined;
    this.hasOrcid = this.isNotEmpty(this.item.findMetadataSortedByPlace('authors.identifier.orcid')[this.index]?.value);
  }

  protected isNotEmpty(variable: any): boolean {
    if (typeof variable == 'string') {
      return isNotEmpty(variable) && ((variable as string) !== PLACEHOLDER_PARENT_METADATA);
    }
    return isNotEmpty(variable);
  }
}