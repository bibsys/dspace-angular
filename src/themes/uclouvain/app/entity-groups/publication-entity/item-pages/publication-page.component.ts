import { AsyncPipe, NgComponentOutlet, NgFor, NgIf } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { RouteService } from 'src/app/core/services/route.service';
import { Context } from 'src/app/core/shared/context.model';
import { DSpaceObjectType } from 'src/app/core/shared/dspace-object-type.model';
import { ViewMode } from 'src/app/core/shared/view-mode.model';
import { ThemedFileSectionComponent } from 'src/app/item-page/simple/field-components/file-section/themed-file-section.component';
import { ThemedItemPageTitleFieldComponent } from 'src/app/item-page/simple/field-components/specific-field/title/themed-item-page-field.component';
import { ItemComponent } from 'src/app/item-page/simple/item-types/shared/item.component';
import { ContextMenuComponent } from 'src/app/shared/context-menu/context-menu.component';
import { isNotEmpty } from 'src/app/shared/empty.util';
import { MetadataLinkViewComponent } from 'src/app/shared/metadata-link-view/metadata-link-view.component';
import { listableObjectComponent } from 'src/app/shared/object-collection/shared/listable-object/listable-object.decorator';
import { MetricDonutsRowComponent } from 'src/app/shared/object-list/metric-donuts/metric-donuts-row/metric-donuts-row.component';
import { ThemedResultsBackButtonComponent } from 'src/app/shared/results-back-button/themed-results-back-button.component';
import { ThemeService } from '../../../../../../app/shared/theme-support/theme.service';
import { ItemPageAbstractCustomFieldComponent } from '../../../item-page/simple/field-components/specific-field/abstract/item-page-abstract-field.component';
import { ItemPageAuthorListElementComponent } from '../../../item-page/simple/field-components/specific-field/metadata-list/fields/author/item-page-author-list-element.component';
import { ItemPageMetadataListComponent } from '../../../item-page/simple/field-components/specific-field/metadata-list/item-page-metadata-list.component';
import { PageDetailSectionComponent } from '../../../shared/page-detail-section.component';
import { ItemCitationsService } from '../citations/item-citations.service';
import { AuthorFormatDisplayComponent } from '../specific-field/author-format-display.component';
import { getListableMetadataBlockComponent } from './listable-metadata-block.decorator';
import { PublicationPageCitationsComponent } from './publication-page-citations/publication-page-citations.component';

@listableObjectComponent('Publication', ViewMode.StandalonePage, Context.Any, 'uclouvain')
@Component({
	selector: 'ds-publication-page',
	styleUrls: ['publication-page.component.scss'],
	templateUrl: './publication-page.component.html',
	standalone: true,
  imports: [
    ThemedResultsBackButtonComponent,
    ThemedItemPageTitleFieldComponent,
    AuthorFormatDisplayComponent,
    ThemedFileSectionComponent,
    MetadataLinkViewComponent,
    MetricDonutsRowComponent,
    NgIf,
    TranslateModule,
    AsyncPipe,
    ContextMenuComponent,
    NgFor,
    ItemPageMetadataListComponent,
    ItemPageAbstractCustomFieldComponent,
    PublicationPageCitationsComponent,
    ItemPageAuthorListElementComponent,
    NgComponentOutlet,
    PageDetailSectionComponent,
  ],
})
export class PublicationPageComponent extends ItemComponent implements OnInit {
	@Input() showLabel: boolean;
	@Input() showMetrics: boolean;
	@Input() viewMode: ViewMode;
	@Input() showCorrection: boolean;
  @Input() showThumbnails: boolean;

	protected readonly DspaceObjectType = DSpaceObjectType;
	protected readonly isNotEmpty = isNotEmpty;

  protected documentType: string;
  protected itemCitation$: Observable<string> = new Observable(null);

  constructor(
      protected routeService: RouteService,
      protected router: Router,
      protected itemCitationsService: ItemCitationsService,
      protected themeService: ThemeService
  ) {
      super(routeService, router);
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.documentType = this.object.firstMetadataValue("dc.type.maintype");
    this.itemCitation$ = this.itemCitationsService.getMainCitationForItem(this.object.id);
  }

  /**
   * Fetch the component depending on the item's entity type, view mode and context
   * @returns {GenericConstructor<Component>}
   */
  getMetadataBlockComponents(): any {
    return getListableMetadataBlockComponent(this.documentType, ViewMode.StandalonePage, Context.Any, this.themeService.getThemeName());
  }
  protected readonly Number = Number;
}