import { NgIf } from "@angular/common";
import { Component, Input, OnInit } from "@angular/core";
import { RouterLink } from "@angular/router";
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import { Context } from "src/app/core/shared/context.model";
import { Item } from "src/app/core/shared/item.model";
import { getItemPageRoute } from "src/app/item-page/item-page-routing-paths";
import { CollectionElementLinkType } from "src/app/shared/object-collection/collection-element-link.type";
import {
  ThemedBadgesComponent
} from "../../../../../../../app/shared/object-collection/shared/badges/themed-badges.component";
import {AuthorFormatDisplayComponent} from "../../specific-field/author-format-display.component";

@Component({
  selector: 'ds-publication-search-result-list-element',
  templateUrl: './publication-search-result-list-element.component.html',
  standalone: true,
  imports: [
    ThemedBadgesComponent,
    NgIf,
    RouterLink,
    AuthorFormatDisplayComponent,
    TranslateModule,
  ]
})
export class PublicationSearchResultListElementComponent implements OnInit {
  @Input() item: Item;
  @Input() linkType: CollectionElementLinkType;
  @Input() linkTypes = CollectionElementLinkType;
  @Input() context: Context;

  protected dsoDate: string;
  protected itemTitle: string;
  protected itemPageRoute: string;

  constructor(
    protected translateService: TranslateService,
  ) {}

  ngOnInit() {
    this.dsoDate = this.item.firstMetadataValue('dc.date.issued');

    if (this.dsoDate) {
      const date = new Date(this.dsoDate);
      this.dsoDate = date.getFullYear().toString();
    }

    this.itemTitle = this.item.firstMetadataValue('dc.title') ?? this.translateService.instant('publication.list.element.title.placeholder');
    this.itemPageRoute = getItemPageRoute(this.item);
  }
}
