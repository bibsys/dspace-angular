import { NgIf } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { isNotEmpty } from '../../../../../../../../app/shared/empty.util';
import { inlineLabeledGroupContentComponent } from '../../../../../../../../app/shared/form/builder/ds-dynamic-form-ui/models/relation-inline-labeled-group/dynamic-relation-inline-labeled-group.decorator';
import { ChipsItem } from '../../../../../../../../app/shared/form/chips/models/chips-item.model';

@inlineLabeledGroupContentComponent('funding.organization')
@Component({
  selector: 'ds-funding-inline-labeled-group-content',
  styleUrls: ['./fundings-inline-labeled-group-content.component.scss'],
  templateUrl: './fundings-inline-labeled-group-content.component.html',
  standalone: true,
  imports: [NgIf]
})
export class FundingsInlineLabeledGroupContentComponent implements OnInit {

  chip: ChipsItem = null;
  protected fundingOrganization: string;
  protected fundingGrant: string;

  constructor(@Inject('chip') chip: ChipsItem) {
    this.chip = chip;
  }

  ngOnInit() {
    this.fundingOrganization = this.formatMetadata(['funding.organization', 'funding.program'], ' -- ');
    this.fundingGrant = this.formatMetadata(['funding.project', 'funding.number'], ' - ');
  }

  /**
   * Get metadata; filter and join them
   * @param keys the metadata name to join.
   * @param glue the string used a glue between parts
   */
  private formatMetadata(keys: string[], glue: string): string {
    return keys
      .map(key => this.chip.getMetadataValue(key))
      .filter(d => isNotEmpty(d))
      .join(glue);
  }
}