import { NgIf } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { inlineLabeledGroupContentComponent } from '../../../../../../../../app/shared/form/builder/ds-dynamic-form-ui/models/relation-inline-labeled-group/dynamic-relation-inline-labeled-group.decorator';
import { ChipsItem } from '../../../../../../../../app/shared/form/chips/models/chips-item.model';

@inlineLabeledGroupContentComponent('dc.contributor.advisor')
@Component({
  selector: 'ds-advisor-inline-labeled-group-content',
  styleUrls: ['./advisors-inline-labeled-group-content.component.scss'],
  templateUrl: './advisors-inline-labeled-group-content.component.html',
  standalone: true,
  imports: [NgIf]
})
export class AdvisorInlineLabeledGroupContentComponent {

  chip: ChipsItem = null;

  constructor(@Inject('chip') chip: ChipsItem) {
    this.chip = chip;
  }

  isAuthorityLinked() {
    return this.chip.hasMetadata('dc.contributor.advisor') && !!this.chip.item['dc.contributor.advisor']?.authority;
  }

}