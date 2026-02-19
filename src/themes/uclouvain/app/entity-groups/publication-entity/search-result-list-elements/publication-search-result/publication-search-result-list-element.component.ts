import { AsyncPipe, NgComponentOutlet, NgForOf, NgIf } from "@angular/common";
import { Component, Input, OnInit } from "@angular/core";
import { RouterLink } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { Context } from "src/app/core/shared/context.model";
import { Item } from "src/app/core/shared/item.model";
import { getFirstSucceededRemoteDataWithNotEmptyPayload } from "src/app/core/shared/operators";
import { AccessConditionObject } from "src/app/core/submission/models/access-condition.model";
import { getItemPageRoute } from "src/app/item-page/item-page-routing-paths";
import { CollectionElementLinkType } from "src/app/shared/object-collection/collection-element-link.type";
import { AccessStatusObject } from "src/app/shared/object-collection/shared/badges/access-status-badge/access-status.model";
import { ThemedBadgesComponent } from "src/app/shared/object-collection/shared/badges/themed-badges.component";
import { ViewMode } from '../../../../../../../app/core/shared/view-mode.model';
import { ThemeService } from '../../../../../../../app/shared/theme-support/theme.service';
import { getListableMetadataBlockComponent } from '../../item-pages/listable-metadata-block.decorator';
import { AuthorFormatDisplayComponent } from "../../specific-field/author-format-display.component";
import { ItemCitationsService } from "../../citations/item-citations.service";
import { Observable } from "rxjs";

@Component({
  selector: 'ds-publication-search-result-list-element',
  templateUrl: './publication-search-result-list-element.component.html',
  standalone: true,
  imports: [
    ThemedBadgesComponent,
    NgIf,
    RouterLink,
    AuthorFormatDisplayComponent,
    AsyncPipe,
    NgComponentOutlet,
    NgForOf,
  ]
})
export class PublicationSearchResultListElementComponent implements OnInit {
    @Input() item: Item;
    @Input() linkType: CollectionElementLinkType;
    @Input() linkTypes = CollectionElementLinkType;
    @Input() context: Context;
  
    protected accessCondition: AccessConditionObject;
    protected itemTitle: string;
    protected blockComponents: any[];
    protected itemPageRoute: string;
    itemCitation$: Observable<string> = new Observable(null);

    constructor(
      protected translateService: TranslateService,
      protected itemCitationsService: ItemCitationsService,
      protected themeService: ThemeService
    ) {}

    ngOnInit() {
      this.blockComponents = getListableMetadataBlockComponent(
        this.item.firstMetadataValue("dc.type.maintype"),
        ViewMode.ListElement,
        this.context,
        this.themeService.getThemeName()
      );
      this.itemTitle = this.item.firstMetadataValue('dc.title') ?? this.translateService.instant('publication.list.element.title.placeholder');
      this.itemPageRoute = getItemPageRoute(this.item);
      if (this.item?.accessStatus) {
        this.item.accessStatus
          .pipe(getFirstSucceededRemoteDataWithNotEmptyPayload())
          .subscribe((access: AccessStatusObject) => {
            this.accessCondition = Object.assign(new AccessConditionObject(), {id: 0, name: access.status});
          });
      }
      // Retrieve the main citation.
      this.itemCitation$ = this.itemCitationsService.getMainCitationForItem(this.item.id);
    }
}