import { Component, Input } from '@angular/core';
import { Item } from '../../../../../../app/core/shared/item.model';

@Component({
  selector: 'ds-master-thesis-faculty-badges',
  template: `
      <span *ngFor="let faculty of object?.allMetadataValues('masterthesis.faculty.code')"
            class="badge badge-faculty-{{ faculty.toLowerCase() }} mr-1">
          {{ faculty }}
      </span>
  `
})
export class MasterThesisFacultyBadgesComponent {
  @Input() object: Item;
}