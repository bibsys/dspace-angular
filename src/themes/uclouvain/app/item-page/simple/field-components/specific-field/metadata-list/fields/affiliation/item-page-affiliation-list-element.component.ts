import { Component, Inject } from "@angular/core";
import { Item } from "src/app/core/shared/item.model";
import { MetadataValue } from "src/app/core/shared/metadata.models";
import { isNotEmpty } from "src/app/shared/empty.util";
import { itemPageMetadataListElementComponent } from "../../item-page-metadata-list.decorator";
import { ItemPageAffiliationFieldComponent } from "../../../affiliation/item-page-affiliation-field.component";

/**
 * Renders a list element for an affiliation.
 * 
 * @author Michaël Pourbaix (michael.pourbaix@uclouvain.be)
 */
@itemPageMetadataListElementComponent('oairecerif.affiliation.orgunitDepartment')
@Component({
  selector: 'item-page-affiliation-list-element',
  template: `<ds-item-page-affiliation-field [item]="item"
                [institutionField]="institutionField"
                [departmentField]="departmentField"
                [index]="index" class="align-middle"/>`,
  standalone: true,
  imports: [ItemPageAffiliationFieldComponent],
})
export class ItemPageAffiliationListElementComponent {
  protected readonly institutionField = 'oairecerif.affiliation.orgunit';
  protected readonly departmentField = 'oairecerif.affiliation.orgunitDepartment';
  protected readonly isNotEmpty = isNotEmpty;

  constructor(
    @Inject('item') protected item: Item,
    @Inject('metadataValue') readonly metadataValue: MetadataValue,
    @Inject('index') protected index: number,
  ) { }
}