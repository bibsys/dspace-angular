import { Component } from "@angular/core";
import { TranslateModule } from "@ngx-translate/core";
import { ViewMode } from "src/app/core/shared/view-mode.model";
import { ClaimedDeletedTaskSearchResult } from "src/app/shared/object-collection/shared/claimed-deleted-task-search-result.model";
import { listableObjectComponent } from "src/app/shared/object-collection/shared/listable-object/listable-object.decorator";
import { SearchResultListElementComponent } from "../../../search-result-list-element/search-result-list-element.component";
import { ClaimedTaskSearchResult } from "src/app/shared/object-collection/shared/claimed-task-search-result.model";
import { ClaimedTask } from "src/app/core/tasks/models/claimed-task-object.model";

@Component({
  selector: 'ds-claimed-deleted-search-result-list-element',
  template: `
    <div class="alert alert-secondary w-100 mb-0" role="alert">
      {{ 'claimed-deleted-search-result-list-element.title' | translate }}
    </div>
  `,
  imports: [
    TranslateModule,
  ],
  standalone: true,
})
@listableObjectComponent(ClaimedDeletedTaskSearchResult, ViewMode.ListElement)
export class ClaimedDeletedSearchResultListElementComponent
  extends SearchResultListElementComponent<ClaimedTaskSearchResult, ClaimedTask> {}