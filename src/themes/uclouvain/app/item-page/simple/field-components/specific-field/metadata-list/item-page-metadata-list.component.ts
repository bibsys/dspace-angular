import { Component, Injector, Input, OnInit, ViewChild } from "@angular/core";
import { getItemPageMetadataListElementComponent } from "./item-page-metadata-list.decorator";
import { Item } from "src/app/core/shared/item.model";
import { DynamicComponentLoaderDirective } from "src/app/shared/abstract-component-loader/dynamic-component-loader.directive";
import { GenericConstructor } from "src/app/core/shared/generic-constructor";
import { MetadataValue } from "src/app/core/shared/metadata.models";
import { isEmpty } from "src/app/shared/empty.util";
import { TruncatableComponent } from "src/app/shared/truncatable/truncatable.component";
import { TruncatablePartComponent } from "src/app/shared/truncatable/truncatable-part/truncatable-part.component";
import { NgComponentOutlet, NgFor, NgIf } from "@angular/common";

/**
 * Custom component to render a list of component for a given metadata field.
 * The result is truncated based on the configuration.
 * @property item: The item to extract the metadata values form.
 * @property metadataField: The field to extract values for.
 * @property truncateMinSpace: The minimum space to have if the content is truncated.
 * @property toggleThreshold: The threshold to reach in order to display the show_more/show_less button.
 * @author Michaël Pourbaix (michael.pourbaix@uclouvain.be)
 */
@Component({
  selector: 'ds-item-page-metadata-list',
  template: `<div>
    <ds-truncatable [id]="getTruncateId()" [showToggle]="showToggle()">
      <ds-truncatable-part [id]="getTruncateId()" [minLines]="truncateMinSpace" [showToggle]="showToggle()">
        <ul *ngIf="getComponent() as component" class="pl-4 mb-0">
          <li *ngFor="let mdValue of metadataValues; index as i" class="mb-1">
            <ng-container *ngComponentOutlet="component; injector: getInjector(item, mdValue, i)"></ng-container>
          </li>
        </ul>
      </ds-truncatable-part>
    </ds-truncatable>
  </div>`,
  standalone: true,
  imports: [
    TruncatableComponent,
    TruncatablePartComponent,
    NgIf,
    NgFor,
    NgComponentOutlet,
  ]
})
export class ItemPageMetadataListComponent implements OnInit {
  @ViewChild(DynamicComponentLoaderDirective, { static: true }) dynamicComponentLoaderDirective: DynamicComponentLoaderDirective;

  @Input()
  item: Item;

  @Input()
  metadataField: string;

  @Input()
  truncateMinSpace: number = 5;

  @Input()
  toggleThreshold: number;

  protected metadataValues: MetadataValue[];

  constructor(private injector: Injector) {
  }

  ngOnInit(): void {
    this.metadataValues = this.item.findMetadataSortedByPlace(this.metadataField);
    if (isEmpty(this.toggleThreshold)) {
      this.toggleThreshold = this.truncateMinSpace;
    }
  }

  getComponent(): GenericConstructor<Component> {
    return getItemPageMetadataListElementComponent(this.metadataField);
  }

  getInjector(item: Item, metadataValue: MetadataValue, elementIndex: string): Injector {
    return Injector.create({
      providers: [
        { provide: 'item', useFactory: () => item, deps: [] },
        { provide: 'metadataValue', useFactory: () => metadataValue, deps: [] },
        { provide: 'index', useFactory: () => elementIndex, deps: [] },
      ],
      parent: this.injector,
    })
  }

  getTruncateId(): string {
    return this.item.id + '-' + this.metadataField;
  }

  showToggle(): boolean {
    return this.metadataValues.length >= this.toggleThreshold;
  }
}