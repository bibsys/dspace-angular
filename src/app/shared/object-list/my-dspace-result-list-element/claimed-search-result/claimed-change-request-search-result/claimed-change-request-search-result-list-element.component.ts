import { Component } from "@angular/core";
import { SearchResultListElementComponent } from "../../../search-result-list-element/search-result-list-element.component";
import { ClaimedTaskSearchResult } from "src/app/shared/object-collection/shared/claimed-task-search-result.model";
import { ClaimedTask } from "src/app/core/tasks/models/claimed-task-object.model";
import { listableObjectComponent } from "src/app/shared/object-collection/shared/listable-object/listable-object.decorator";
import { ClaimedChangeRequestTaskSearchResult } from "src/app/shared/object-collection/shared/claimed-change-request-task-search-result.model";
import { ViewMode } from "src/app/core/shared/view-mode.model";

@Component({
    selector: 'ds-claimed-change-request-search-result-list-element',
    template: `
      <div class="alert alert-secondary w-100" role="alert">
        {{ 'claimed-change-request-search-result-list-element.title' | translate }}
      </div>
    `
})
@listableObjectComponent(ClaimedChangeRequestTaskSearchResult, ViewMode.ListElement)
export class ClaimedChangeRequestSearchResultListElementComponent
  extends SearchResultListElementComponent<ClaimedTaskSearchResult, ClaimedTask> {}