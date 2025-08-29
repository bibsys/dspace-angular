import { NgIf } from "@angular/common";
import { Component, Input, OnInit } from "@angular/core";
import { Item } from "src/app/core/shared/item.model";
import { isNotEmpty } from "src/app/shared/empty.util";
import { affiliationIcons } from "src/themes/uclouvain/app/shared/affiliations/affiliations-icons-mapping";

@Component({
  selector: 'ds-item-page-affiliation-field',
  template: `<div class="d-flex align-items-center" *ngIf="institution">
    <span *ngIf="institutionIcon" class="mr-1">
        <img [src]="institutionIcon"/>
    </span>
    <span class="institution-name">{{ institution }}</span>
    <span class="department-name">{{ department }}</span>
  </div>`,
  styles: ['.institution-name + .department-name::before { content: "—"; padding: 0.5rem; }'],
  standalone: true,
  imports: [NgIf],
})
export class ItemPageAffiliationFieldComponent implements OnInit {
  @Input() item: Item;
  @Input() institutionField: string;
  @Input() departmentField: string;
  // Potential index of the metadata to use (if multiple affiliations).
  @Input() index: string;

  institution: string;
  department: string;
  institutionIcon: string;

  ngOnInit(): void {
    if (isNotEmpty(this.index)) {
      this.institution = this.item.findMetadataSortedByPlace(this.institutionField)[this.index]?.value;
      this.department = this.item.findMetadataSortedByPlace(this.departmentField)[this.index]?.value;
    } else {
      this.institution = this.item.firstMetadataValue(this.institutionField);
      this.department = this.item.firstMetadataValue(this.departmentField);
    }
    this.institutionIcon = this.getInstitutionIcon();
  }

  getInstitutionIcon(): string {
    return affiliationIcons.get(this.institution?.toLowerCase());
  }
}