import { Component } from '@angular/core';
import { ItemListPreviewComponent as BaseComponent } from 'src/app/shared/object-list/my-dspace-result-list-element/item-list-preview/item-list-preview.component';

@Component({
    selector: 'ds-item-list-preview',
    templateUrl: './item-list-preview.component.html',
})
export class ItemListPreviewComponent extends BaseComponent {}
