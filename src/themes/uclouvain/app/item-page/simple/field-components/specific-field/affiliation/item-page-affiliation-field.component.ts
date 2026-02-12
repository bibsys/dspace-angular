import { NgIf } from "@angular/common";
import { Component, Input, OnInit } from "@angular/core";
import { TranslateModule } from '@ngx-translate/core';
import { affiliationIcons } from "src/themes/uclouvain/app/shared/affiliations/affiliations-icons-mapping";
import { Item } from '../../../../../../../../app/core/shared/item.model';
import { MetadataValue } from '../../../../../../../../app/core/shared/metadata.models';
import { hasValue } from '../../../../../../../../app/shared/empty.util';
import {
  PLACEHOLDER_PARENT_METADATA
} from '../../../../../../../../app/shared/form/builder/ds-dynamic-form-ui/ds-dynamic-form-constants';
import { ItemLinkViewComponent } from '../../../../../shared/item-link-view/item-link-view.component';

@Component({
  selector: 'ds-item-page-affiliation-field',
  template: `<div class="d-inline-flex align-items-center" *ngIf="hasValue(institution) && institution.value !== PLACEHOLDER_PARENT_METADATA">
    <img *ngIf="iconPath" [src]="iconPath" [alt]="'item.page.institution.icon' | translate" class="mr-1"/>
    <ds-item-link-view class="institution-name" 
                       [metadataValue]="institution"
                       [relatedItemType]="'orgunit'">
    </ds-item-link-view>
    <ds-item-link-view class="department-name" 
                       [metadataValue]="department"
                       [relatedItemType]="'orgunit'"
                       *ngIf="hasValue(department) && department.value !== PLACEHOLDER_PARENT_METADATA">
    </ds-item-link-view>
  </div>`,
  styles: ['.institution-name + .department-name::before { content: "—"; padding: 0.5rem; }'],
  standalone: true,
  imports: [NgIf, ItemLinkViewComponent, TranslateModule],
})
export class ItemPageAffiliationFieldComponent implements OnInit {

  @Input() item: Item;
  @Input() institutionField: string;
  @Input() departmentField: string;
  @Input() index: number;  // Potential index of the metadata to use (if multiple affiliations).

  protected institution: MetadataValue;
  protected department: MetadataValue;
  protected iconPath: string;
  protected readonly hasValue = hasValue;
  protected readonly PLACEHOLDER_PARENT_METADATA = PLACEHOLDER_PARENT_METADATA;

  ngOnInit(): void {
    if (this.index !== undefined) {
      this.institution = this.item.findMetadataSortedByPlace(this.institutionField)[this.index];
      this.department = this.item.findMetadataSortedByPlace(this.departmentField)[this.index];
    } else {
      this.institution = this.item.firstMetadata(this.institutionField);
      this.department = this.item.firstMetadata(this.departmentField);
    }
    if (hasValue(this.institution)) {
      this.iconPath = affiliationIcons.get(this.institution.value?.toLowerCase());
    }
  }

}