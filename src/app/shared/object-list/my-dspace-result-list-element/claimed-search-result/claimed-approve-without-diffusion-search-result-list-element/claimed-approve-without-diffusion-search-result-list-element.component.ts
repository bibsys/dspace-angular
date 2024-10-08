import { Component } from "@angular/core";
import { SearchResultListElementComponent } from "../../../search-result-list-element/search-result-list-element.component";
import { ClaimedTaskSearchResult } from "src/app/shared/object-collection/shared/claimed-task-search-result.model";
import { ClaimedTask } from "src/app/core/tasks/models/claimed-task-object.model";
import { listableObjectComponent } from "src/app/shared/object-collection/shared/listable-object/listable-object.decorator";
import { ViewMode } from "src/app/core/shared/view-mode.model";
import { ClaimedApproveWithoutDiffusionTaskSearchResult } from "src/app/shared/object-collection/shared/claimed-approve-without-diffusion-search-result.model";

@Component({
    selector: 'ds-claimed-approve-without-diffusion-search-result-list-element',
    template: `
      <div class="alert alert-success w-100" role="alert">
        {{ 'claimed-approve-without-diffusion-search-result-list-element.title' | translate }}
      </div>
    `
})
@listableObjectComponent(ClaimedApproveWithoutDiffusionTaskSearchResult, ViewMode.ListElement)
export class ClaimedApproveWithoutDiffusionSearchResultListElementComponent
  extends SearchResultListElementComponent<ClaimedTaskSearchResult, ClaimedTask> {}