import {
  AsyncPipe,
  NgFor,
  NgIf,
} from '@angular/common';
import {Component, Inject} from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import {
  inlineLabeledGroupContentComponent
} from "../../../../../../../../app/shared/form/builder/ds-dynamic-form-ui/models/relation-inline-labeled-group/dynamic-relation-inline-labeled-group.decorator";
import {BtnDisabledDirective} from "../../../../../../../../app/shared/btn-disabled.directive";
import {ThemedLoadingComponent} from "../../../../../../../../app/shared/loading/themed-loading.component";
import {ChipsItem} from "../../../../../../../../app/shared/form/chips/models/chips-item.model";
import {PLACEHOLDER_VALUE} from "../../../../../../../../app/core/shared/metadata.utils";


@inlineLabeledGroupContentComponent('dc.additional.uri')
@Component({
  selector: 'ds-dynamic-additional-links',
  templateUrl: './dynamic-additional-links.component.html',
  standalone: true,
  imports: [
    NgIf,
    TranslateModule,
  ],
})
export class DsDynamicAdditionalLinksComponent {

  chip: ChipsItem = null;

  constructor(@Inject('chip') chip: ChipsItem) {
    this.chip = chip;
  }

  getValue(chip: ChipsItem, metadata: string): string {
    const value = chip.item[metadata]?.value ?? chip.item[metadata];
    return value !== PLACEHOLDER_VALUE ? value : null;
  }
}
