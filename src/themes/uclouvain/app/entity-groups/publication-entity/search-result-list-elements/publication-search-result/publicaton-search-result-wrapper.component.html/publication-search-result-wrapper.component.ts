
import { Component, Inject, OnInit, Optional } from "@angular/core";
import { DSONameService } from "src/app/core/breadcrumbs/dso-name.service";
import { LinkService } from "src/app/core/cache/builders/link.service";
import { Context } from "src/app/core/shared/context.model";
import { ViewMode } from "src/app/core/shared/view-mode.model";
import { ItemSearchResult } from "src/app/shared/object-collection/shared/item-search-result.model";
import { listableObjectComponent } from "src/app/shared/object-collection/shared/listable-object/listable-object.decorator";
import { ItemSearchResultListElementComponent } from "src/app/shared/object-list/search-result-list-element/item-search-result/item-types/item/item-search-result-list-element.component";
import { TruncatableService } from "src/app/shared/truncatable/truncatable.service";
import { followLink } from "src/app/shared/utils/follow-link-config.model";

@listableObjectComponent(ItemSearchResult, ViewMode.ListElement, Context.MyDSpaceWorkflow, 'uclouvain')
@listableObjectComponent(ItemSearchResult, ViewMode.ListElement, Context.MyDSpaceWorkspace, 'uclouvain')
@listableObjectComponent(ItemSearchResult, ViewMode.ListElement, Context.Search, 'uclouvain')
@Component({
    selector: 'ds-publication-search-result-list-element-wrapper',
    template: `
        <ds-publication-search-result-list-element 
            [item]="object?.indexableObject"
            [linkType]="linkType"
            [linkTypes]="linkTypes"
            [context]="context"
        />
    `,
})
export class PublicationSearchResultWrapperComponent extends ItemSearchResultListElementComponent implements OnInit {

    constructor(
        protected truncatableService: TruncatableService,
        public dsoNameService: DSONameService,
        protected linkService: LinkService,
    ) {
        super(truncatableService, dsoNameService);
    }

    ngOnInit(): void {
        super.ngOnInit();
        if (this.dso) {
            this.linkService.resolveLink(this.dso, followLink('accessStatus'));
        }
    }
}