import { Component, Inject } from '@angular/core';
import {
  inlineLabeledGroupContentComponent
} from '../../../../../../../../app/shared/form/builder/ds-dynamic-form-ui/models/relation-inline-labeled-group/dynamic-relation-inline-labeled-group.decorator';
import { ChipsItem } from '../../../../../../../../app/shared/form/chips/models/chips-item.model';
import { isNotEmpty } from '../../../../../../../../app/shared/empty.util';

@inlineLabeledGroupContentComponent('oairecerif.affiliation.orgunit')
@Component({
  selector: 'ds-org-unit-inline-labeled-group-content',
  styles: [
    '.organisation-name { font-weight: bold; }',
    '.organisation-name + .entity-name { &:before { content: "—"; margin-left: .25rem; margin-right: .25rem; }}'
  ],
  template: `
    <img *ngIf="iconPath" [src]="iconPath" [title]="chip.display" class="mr-2"/>
    <span *ngIf="organisationName" class="organisation-name">{{ organisationName }}</span>
    <span *ngIf="entityName" class="entity-name">{{ entityName }}</span>
  `,
})
export class OrgUnitInlineLabeledGroupContentComponent {

  chip: ChipsItem = null;
  iconPath: string = null;
  organisationName: string = null;
  entityName: string = null;

  constructor(@Inject('chip') chip: ChipsItem) {
    this.chip = chip;
    this.iconPath = this.findBestIcon();
    this.organisationName = chip.getMetadataValue('oairecerif.affiliation.orgunit');
    this.entityName = chip.getMetadataValue('oairecerif.affiliation.orgunitDepartment');

  }

  private findBestIcon(): string | null {
    const isControlledOrgUnit = this.chip.hasMetadata('oairecerif.affiliation.orgunit')
      ? isNotEmpty(this.chip.item['oairecerif.affiliation.orgunit'].authority)
      : false;
    if (isControlledOrgUnit) {
      const orgUnitValue = this.chip.getMetadataValue('oairecerif.affiliation.orgunit').toLowerCase()
      switch (orgUnitValue) {
        case 'uclouvain': return 'assets/uclouvain/images/chips/uclouvain-logo-16x16.png';
        case 'unamur': return 'assets/uclouvain/images/chips/unamur-logo-16x16.png';
        case 'usl-b': return 'assets/uclouvain/images/chips/uslb-logo-16x16.png';
      }
    }
    return null;
  }

}