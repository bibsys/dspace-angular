import { Component, Inject, Input } from '@angular/core';
import { Item } from '../../../../../../core/shared/item.model';
import { LayoutField } from '../../../../../../core/layout/models/metadata-component.model';
import { RenderingTypeModelComponent } from './rendering-type.model';
import { TranslateService } from '@ngx-translate/core';

/**
 * This class defines the basic model to extends for create a new
 * field render component
 */
@Component({
  template: ''
})
export abstract class RenderingTypeValueModelComponent extends RenderingTypeModelComponent {

  /**
   * Current metadata value to render
   */
  @Input() metadataValue: any;

  constructor(
    @Inject('fieldProvider') public fieldProvider: LayoutField,
    @Inject('itemProvider') public itemProvider: Item,
    @Inject('metadataValueProvider') public metadataValueProvider: any,
    @Inject('renderingSubTypeProvider') public renderingSubTypeProvider: string,
    protected translateService: TranslateService
  ) {
    super(translateService);
    this.field = fieldProvider;
    this.item = itemProvider;
    this.metadataValue = metadataValueProvider;
    this.renderingSubType = renderingSubTypeProvider;
  }

}
