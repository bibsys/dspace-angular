import { Component } from '@angular/core';
import {
  ItemPageTitleFieldComponent as BaseComponent
} from '../../../../../../../../app/item-page/simple/field-components/specific-field/title/item-page-title-field.component';

@Component({
  selector: 'ds-themed-item-page-title-field',
  styles: ['h1 { font-size: 2rem; font-weight: 600; font-family: var(--uclouvain-publication-title-font),serif; }'],
  template: `
    <h1 class="item-page-title-field d-flex justify-content-between m-0">
      <span class="dont-break-out">{{ dsoNameService.getName(item) }}</span>  
    </h1>`,
  imports: [],
  standalone: true,
})
export class ItemPageTitleFieldComponent extends BaseComponent {
}