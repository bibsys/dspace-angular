import { Component, Input } from '@angular/core';
import { Item } from '../../../../../../../../app/core/shared/item.model';
import { isNotEmpty } from '../../../../../../../../app/shared/empty.util';
import { Observable } from 'rxjs';
import { BrowseDefinition } from '../../../../../../../../app/core/shared/browse-definition.model';
import { getRemoteDataPayload } from '../../../../../../../../app/core/shared/operators';
import { map } from 'rxjs/operators';
import { BrowseDefinitionDataService } from '../../../../../../../../app/core/browse/browse-definition-data.service';

/** Component to display metadata list as bootstrap badges */
@Component({
  selector: 'ds-list-item-page-field',
  template: `
    <ng-container *ngVar="item?.allMetadata(fields) as mdValues">
        <div *ngIf="isNotEmpty(mdValues)" class="item-page-field">
            <ds-metadata-field-wrapper [label]="label | translate">
                <ul>
                    <li *ngFor="let mdValue of mdValues">
                        <ds-metadata-values 
                                [mdValues]="[mdValue]" 
                                [browseDefinition]="browseDefinition|async"
                        ></ds-metadata-values>
                    </li>
                </ul>
            </ds-metadata-field-wrapper>
        </div>
    </ng-container>
  `
})
export class ItemPageListFieldsComponent {

  @Input() item: Item;
  @Input() fields: string[];
  @Input() label: string;

  protected readonly isNotEmpty = isNotEmpty;

  constructor(protected browseDefinitionDataService: BrowseDefinitionDataService) {
  }

  /**
   * Return browse definition that matches any field used in this component if it is configured as a browse
   * link in dspace.cfg (webui.browse.link.<n>)
   */
  get browseDefinition(): Observable<BrowseDefinition> {
    return this.browseDefinitionDataService.findByFields(this.fields).pipe(
      getRemoteDataPayload(),
      map((def) => def)
    );
  }
}