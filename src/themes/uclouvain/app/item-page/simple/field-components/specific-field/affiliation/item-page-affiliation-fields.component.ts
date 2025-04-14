import { KeyValuePipe, NgForOf, NgIf } from "@angular/common";
import { Component, Input, OnInit } from "@angular/core";
import { Item } from "src/app/core/shared/item.model";
import { MetadataValue } from "src/app/core/shared/metadata.models";

/**
 * Component to properly display the affiliations of a publication.
 * 
 * @author Michaël Pourbaix (michael.pourbaix@uclouvain.be)
 */
@Component({
  selector: 'ds-item-page-affiliation-field',
  template: `<ng-container *ngFor="let affiliation of affiliations | keyvalue; let i=index; let last=last;">
    <span>({{affiliation.value.value}}) {{affiliation.key.value}}</span>
    <span *ngIf="!last"> ; </span>
  </ng-container>`,
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    KeyValuePipe,
  ],
})
export class ItemPageAffiliationFieldComponent implements OnInit {
  @Input() item: Item;

  protected affiliations: Map<MetadataValue, MetadataValue> = new Map();

  ngOnInit(): void {
    let affiliationDepartments = this.item.allMetadata('oairecerif.affiliation.orgunitDepartment');
    let affiliationInstitutions = this.item.allMetadata('oairecerif.affiliation.orgunit');

    if (affiliationDepartments.length != 0 && (affiliationDepartments.length === affiliationInstitutions.length)) {
      affiliationDepartments.forEach((department, index) => {
        if (!this.affiliations.has(department)) {
          this.affiliations.set(department, affiliationInstitutions[index]);
        }
      })
    }
  }
}