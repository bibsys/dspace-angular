import { Component, Injector, Input } from "@angular/core";
import { getOneboxResultElementComponent } from "./onebox-result-element-decorator";
import { VarDirective } from "src/app/shared/utils/var.directive";
import { NgComponentOutlet } from "@angular/common";
import { VocabularyEntry } from "src/app/core/submission/vocabularies/models/vocabulary-entry.model";
import { ONEBOX_TYPEAHEAD_SELECT_HANDLER } from "../dynamic-onebox.component";
import { NgbTypeaheadSelectItemEvent } from "@ng-bootstrap/ng-bootstrap";

/**
 * Component to load a specific search result component for a given metadata field.
 */
@Component({
    selector: 'ds-onebox-result-element-loader',
    template: `
      <ng-container *ngVar="getComponent(metadataField) as component">
        <div (mousedown)="onSelect(data)">
          <ng-container *ngComponentOutlet="component; inputs: {entry: data}"></ng-container>
        </div> 
      </ng-container>
    `,
    standalone: true,
    imports: [
      VarDirective,
      NgComponentOutlet,
    ],
})
export class OneboxResultElementComponentLoader {
  @Input() data: VocabularyEntry;
  @Input() metadataField: string;

  constructor(private injector: Injector){}

  getComponent(metadataField: string) {
    return getOneboxResultElementComponent(metadataField);
  }

  /**
   * Propagate an event when the entry selected by the user.
   * This has to be done because component injection breaks the normal behavior of ngbTypeahead.
   * 
   * @param entry The entry to send a selection event for.
   */
  onSelect(entry: VocabularyEntry) {
    const event: NgbTypeaheadSelectItemEvent<VocabularyEntry> = { item: entry, preventDefault: () => {} };
    this.injector.get<any>(ONEBOX_TYPEAHEAD_SELECT_HANDLER)?.(event);
  }
}