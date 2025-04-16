import { Component, Inject, Input, OnInit } from "@angular/core";
import { Item } from "src/app/core/shared/item.model";
import { MetadataValue } from "src/app/core/shared/metadata.models";
import { isNotEmpty } from "src/app/shared/empty.util";
import { itemPageMetadataListElementComponent } from "../../item-page-metadata-list.decorator";
import { NgIf } from "@angular/common";

/**
 * Renders a list element for an affiliation.
 * 
 * @author Michaël Pourbaix (michael.pourbaix@uclouvain.be)
 */
@itemPageMetadataListElementComponent('oairecerif.affiliation.orgunitDepartment')
@Component({
  selector: 'item-page-affiliation-list-element',
  template: `<div class="d-flex align-items-center">
    <span *ngIf="affiliationIcon" class="mr-1">
      <img [src]="affiliationIcon"/>
    </span>
    <span class="mr-2">{{ affiliationInstitution }}:</span>
    <span>{{ affiliationDepartment }}</span>
  </div>`,
  standalone: true,
  imports: [NgIf],
})
export class ItemPageAffiliationListElementComponent implements OnInit {

  protected affiliationIcons: Map<string, string> = new Map([
    ['uclouvain', 'assets/uclouvain/images/chips/uclouvain-logo-16x16.png'],
    ['unamur', 'assets/uclouvain/images/chips/unamur-logo-16x16.png'],
    ['usl-b', 'assets/uclouvain/images/chips/uslb-logo-16x16.png'],
  ])

  protected affiliationInstitution: string;
  protected affiliationIcon: string;
  protected affiliationDepartment: string;

  protected readonly isNotEmpty = isNotEmpty;

  constructor(
    @Inject('item') protected item: Item,
    @Inject('metadataValue') readonly metadataValue: MetadataValue,
    @Inject('index') protected index: number,
  ) { }

  ngOnInit(): void {
    this.affiliationDepartment = this.metadataValue?.value;
    this.affiliationInstitution =
      this.item.findMetadataSortedByPlace('oairecerif.affiliation.orgunit')[this.index]?.value;
    if (isNotEmpty(this.affiliationInstitution)) {
      this.affiliationIcon = this.affiliationIcons.get(this.affiliationInstitution.toLowerCase());
    }
  }
}