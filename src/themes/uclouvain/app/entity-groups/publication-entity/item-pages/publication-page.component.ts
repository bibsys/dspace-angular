import { Component, Input, OnInit } from '@angular/core';
import { Context } from 'src/app/core/shared/context.model';
import { DSpaceObjectType } from 'src/app/core/shared/dspace-object-type.model';
import { ViewMode } from 'src/app/core/shared/view-mode.model';
import { ItemComponent } from 'src/app/item-page/simple/item-types/shared/item.component';
import { isNotEmpty } from 'src/app/shared/empty.util';
import { listableObjectComponent } from 'src/app/shared/object-collection/shared/listable-object/listable-object.decorator';
import { PUBLICATION_TYPES_MAPPING } from '../type-label-mapping';
import { ThemedResultsBackButtonComponent } from 'src/app/shared/results-back-button/themed-results-back-button.component';
import { ThemedItemPageTitleFieldComponent } from 'src/app/item-page/simple/field-components/specific-field/title/themed-item-page-field.component';
import { AuthorFormatDisplayComponent } from '../specific-field/author-format-display.component';
import { ThemedFileSectionComponent } from 'src/app/item-page/simple/field-components/file-section/themed-file-section.component';
import { GenericItemPageFieldComponent } from 'src/app/item-page/simple/field-components/specific-field/generic/generic-item-page-field.component';
import { MetadataLinkViewComponent } from 'src/app/shared/metadata-link-view/metadata-link-view.component';
import { ItemPageAffiliationFieldComponent } from '../../../item-page/simple/field-components/specific-field/affiliation/item-page-affiliation-fields.component';
import { MetricDonutsRowComponent } from 'src/app/shared/object-list/metric-donuts/metric-donuts-row/metric-donuts-row.component';
import { PublicationPageDetailsRendererComponent } from './publication-page-details/publication-page-details-renderer.component';
import { AsyncPipe, NgComponentOutlet, NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ContextMenuComponent } from 'src/app/shared/context-menu/context-menu.component';

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
		GenericItemPageFieldComponent,
		MetadataLinkViewComponent,
		ItemPageAffiliationFieldComponent,
		MetricDonutsRowComponent,
		PublicationPageDetailsRendererComponent,
		NgIf,
		TranslateModule,
		NgComponentOutlet,
		AsyncPipe,
		ContextMenuComponent,
		NgFor,
		NgTemplateOutlet,
	],
})
export class PublicationPageComponent extends ItemComponent implements OnInit {
	@Input() showLabel: boolean;
	@Input() showMetrics: boolean;
	@Input() viewMode: ViewMode;
	@Input() showCorrection: boolean;

	protected readonly DspaceObjectType = DSpaceObjectType;
	protected readonly isNotEmpty = isNotEmpty;

	protected typeLabel: string;

	ngOnInit(): void {
		this.typeLabel =
			PUBLICATION_TYPES_MAPPING[(this.object.firstMetadataValue("dc.type.maintype"))] ?? "publication.type.unknown.heading";
	}
}