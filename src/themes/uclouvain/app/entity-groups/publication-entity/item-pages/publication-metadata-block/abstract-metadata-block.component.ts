import { Component, Input } from '@angular/core';
import { Item } from '../../../../../../../app/core/shared/item.model';

@Component({
  template: '',
  standalone: true,
})
export abstract class AbstractMetadataBlockComponent {
  @Input() item!: Item;

  hasValidMetadata(mdField: string): boolean {
    const mdValue = (this.item.hasMetadata(mdField)) ? this.item.firstMetadata(mdField) : undefined;
    if (!mdValue) {
      return false;
    }
    const invalidPattern = /^(n\/?a|not specified|no[tn] applicable)$/i;
    return !invalidPattern.test(mdValue.value.trim());
  }

}