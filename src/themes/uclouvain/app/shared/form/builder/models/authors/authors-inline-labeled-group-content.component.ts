import { NgIf } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { inlineLabeledGroupContentComponent } from '../../../../../../../../app/shared/form/builder/ds-dynamic-form-ui/models/relation-inline-labeled-group/dynamic-relation-inline-labeled-group.decorator';
import { ChipsItem } from '../../../../../../../../app/shared/form/chips/models/chips-item.model';

@inlineLabeledGroupContentComponent('dc.contributor.author')
@Component({
  selector: 'ds-author-inline-labeled-group-content',
  styleUrls: ['./authors-inline-labeled-group-content.component.scss'],
  templateUrl: './authors-inline-labeled-group-content.component.html',
  standalone: true,
  imports: [NgIf]
})
export class AuthorInlineLabeledGroupContentComponent {

  chip: ChipsItem = null;

  constructor(@Inject('chip') chip: ChipsItem) {
    this.chip = chip;
  }

  isAuthorityLinked() {
    return this.chip.hasMetadata('dc.contributor.author') && !!this.chip.item['dc.contributor.author']?.authority;
  }

}