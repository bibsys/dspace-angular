import { Component, Input } from '@angular/core';
import { Item } from '../../../../../../../app/core/shared/item.model';

@Component({
  template: '',
  standalone: true,
})
export abstract class AbstractMetadataBlockComponent {
  @Input() item!: Item;
}