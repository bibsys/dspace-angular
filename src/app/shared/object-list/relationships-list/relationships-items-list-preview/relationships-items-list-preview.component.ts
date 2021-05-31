import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { fadeInOut } from '../../../animations/fade';
import { Item } from '../../../../core/shared/item.model';
import { SearchResult } from '../../../search/search-result.model';
import { DuplicateMatchMetadataDetailConfig } from '../../../../submission/sections/detect-duplicate/models/duplicate-detail-metadata.model';

@Component({
  selector: 'ds-relationships-items-list-preview',
  templateUrl: './relationships-items-list-preview.component.html',
  styleUrls: ['./relationships-items-list-preview.component.scss'],
  animations: [fadeInOut]
})
export class RelationshipsItemsListPreviewComponent {

  /**
   * The item to display
   */
  @Input() item: Item;

  /**
   * The custom information object
   */
  @Input() customData: any;

  /**
   * The search result object
   */
  @Input() object: SearchResult<any>;

  /**
   * A boolean representing if to show submitter information
   */
  @Input() showSubmitter = false;

  /**
   * An string utilized for specifying the type of view which component is being used for
   */
  @Input() viewConfig = 'default';

  /**
   * Emit when trying to delete the relationship
   */
  @Output() deleteRelationship = new EventEmitter<any>();

  /**
   * When a button is clicked emit the event to the parent components
   */
  emitAction(): void {
    this.deleteRelationship.emit({ action: 'delete', item: this.object, relationship: this.customData.relationship });
  }
}
