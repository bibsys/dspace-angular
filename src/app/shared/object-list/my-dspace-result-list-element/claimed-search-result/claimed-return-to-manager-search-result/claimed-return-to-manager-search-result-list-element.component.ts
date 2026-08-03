import { Component } from "@angular/core";
import { SearchResultListElementComponent } from "../../../search-result-list-element/search-result-list-element.component";
import { ClaimedTaskSearchResult } from "src/app/shared/object-collection/shared/claimed-task-search-result.model";
import { ClaimedTask } from "src/app/core/tasks/models/claimed-task-object.model";
import { listableObjectComponent } from "src/app/shared/object-collection/shared/listable-object/listable-object.decorator";
import { ViewMode } from "src/app/core/shared/view-mode.model";
import { TranslateModule } from "@ngx-translate/core";
import { ClaimedReturnToManagerTaskSearchResult } from "src/app/shared/object-collection/shared/claimed-return-to-manager-task-search-result.model";

@Component({
    selector: 'ds-claimed-return-to-manager-search-result-list-element',
    template: `
      <div class="alert alert-secondary w-100" role="alert">
        {{ 'claimed-return-to-manager-search-result-list-element.title' | translate }}
      </div>
    `,
    imports: [
      TranslateModule,
    ],
    standalone: true,
})
@listableObjectComponent(ClaimedReturnToManagerTaskSearchResult, ViewMode.ListElement)
export class ClaimedReturnToManagerSearchResultListElementComponent
  extends SearchResultListElementComponent<ClaimedTaskSearchResult, ClaimedTask> {}